'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

const { parseISO, format } = require('date-fns')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Expense = use('App/Models/Expense')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category')

class ExpenseController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response, view }) {
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

    const category = await Category.findOrFail(category_id)

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

    await expense.load('user')
    await expense.load('category')

    return expense
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ExpenseController
