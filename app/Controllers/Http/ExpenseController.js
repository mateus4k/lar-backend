'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

const { parseISO, format } = require('date-fns')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Expense = use('App/Models/Expense')

class ExpenseController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const expenses = await request.family.expenses().fetch()

    return { expenses }
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ request, response, auth }) {
    let { category_id, note, value, date } = request.all()

    value = Number(value.toString().replace(',', '.'))
    date = format(parseISO(date), 'yyyy-MM-dd HH:mm:ss')

    const category = await request.family
      .categories()
      .where('id', category_id)
      .first()

    if (category.type !== 'expense') {
      return response.status(401).send()
    }

    const expense = await Expense.create({
      user_id: auth.user.id,
      family_id: request.family.id,
      category_id,
      note,
      value,
      date
    })

    return response.status(201).json({ expense })
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async show({ params, request }) {
    const expense = await request.family
      .expenses()
      .where('id', params.id)
      .first()

    await expense.loadMany(['user', 'category'])

    return expense
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

        if (category.type !== 'expense') {
          throw new Error('Category type must be expense.')
        }
      }

      const leader = await request.family.leader().fetch()

      if (auth.user.id !== leader.id) {
        throw new Error('You need to be a family leader to update a expense.')
      }

      const expense = await request.family
        .expenses()
        .where('id', params.id)
        .first()

      expense.merge(data)

      await expense.save()

      return response.status(204).send()
    } catch (error) {
      return response.status(401).json({ error: error.message })
    }
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy({ params, request, response, auth }) {
    try {
      const expense = await request.family
        .expenses()
        .where('id', params.id)
        .first()

      const leader = await request.family.leader().fetch()

      if (auth.user.id !== leader.id) {
        throw new Error('You need to be a family leader to delete a expense.')
      }

      await expense.delete()

      response.status(204).send()
    } catch (error) {
      return response.status(401).json({ error: error.message })
    }
  }
}

module.exports = ExpenseController
