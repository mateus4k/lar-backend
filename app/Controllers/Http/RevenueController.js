'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

const { parseISO, format } = require('date-fns')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Revenue = use('App/Models/Revenue')

class RevenueController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const revenues = await request.family.revenues().fetch()

    return { revenues }
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ request, response, auth }) {
    let { category_id, note, value, date } = request.only([
      'category_id',
      'note',
      'value',
      'date'
    ])

    value = Number(value.toString().replace(',', '.'))
    date = format(parseISO(date), 'yyyy-MM-dd HH:mm:ss')

    const category = await request.family
      .categories()
      .where('id', category_id)
      .first()

    if (category.type !== 'revenue') {
      return response.status(401).send()
    }

    const revenue = await Revenue.create({
      user_id: auth.user.id,
      family_id: request.family.id,
      category_id,
      note,
      value,
      date
    })

    return response.status(201).json({ revenue })
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async show({ params, request }) {
    const revenue = await request.family
      .revenues()
      .where('id', params.id)
      .first()

    await revenue.loadMany(['user', 'category'])

    return revenue
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update({ params, request, response, auth }) {
    try {
      const data = request.only(['category_id', 'note', 'value', 'date'])

      if (data.value) {
        data.value = Number(data.value.toString().replace(',', '.'))
      }

      if (data.date) {
        data.date = format(parseISO(data.date), 'yyyy-MM-dd HH:mm:ss')
      }

      if (data.category_id) {
        const category = await request.family
          .categories()
          .where('id', data.category_id)
          .first()

        if (category.type !== 'revenue') {
          throw new Error('Category type must be revenue.')
        }
      }

      const leader = await request.family.leader().fetch()

      if (auth.user.id !== leader.id) {
        throw new Error('You need to be a family leader to update a revenue.')
      }

      const revenue = await request.family
        .revenues()
        .where('id', params.id)
        .first()

      revenue.merge(data)

      await revenue.save()

      await revenue.reload()

      return response.status(204).send()
    } catch (error) {
      return response.status(401).send()
    }
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy({ params, request, response, auth }) {
    const revenue = await request.family
      .revenues()
      .where('id', params.id)
      .first()

    const leader = await request.family.leader().fetch()

    if (auth.user.id !== leader.id) {
      response.status(401).send()
    }

    await revenue.delete()

    response.status(204).send()
  }
}

module.exports = RevenueController
