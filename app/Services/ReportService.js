'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/lucid/src/Lucid/Model')} Family */
/** @typedef {import('@adonisjs/lucid/src/Lucid/Model')} User */

class ReportService {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Family} ctx.family
   * @param {User} ctx.user
   */
  constructor(ctx) {
    const { request, family, user } = ctx
    this.request = request
    this.family = family
    this.user = user
    this.isUserLeader = false
  }

  async index() {
    this.isUserLeader = await this._isUserLeader()

    if (this.request.input('by') === 'category') {
      return this._byCategory()
    }

    return this._loadExpensesAndRevenues()
  }

  async _isUserLeader() {
    const leader = await this.family.leader().first()
    return this.user.id === leader.id
  }

  async _byCategory() {
    const baseCategoriesQuery = this.family.categories()

    if (this.request.input('get') === 'expenses') {
      baseCategoriesQuery
        .with('expenses')
        .withCount('expenses as total_expenses')
    }

    if (this.request.input('get') === 'revenues') {
      baseCategoriesQuery
        .with('revenues')
        .withCount('revenues as total_revenues')
    }

    if (!this.isUserLeader) {
      baseCategoriesQuery.where('user_id', this.user.id)
    }

    let categories = await baseCategoriesQuery.fetch()
    categories = categories.toJSON()

    return { categories }
  }

  async _loadExpensesAndRevenues() {
    let expenses, revenues

    const baseExpensesQuery = this.family.expenses()
    const baseRevenuesQuery = this.family.revenues()

    if (this.isUserLeader) {
      expenses = await baseExpensesQuery.fetch()
      revenues = await baseRevenuesQuery.fetch()
    } else {
      expenses = await baseExpensesQuery.where('user_id', this.user.id).fetch()
      revenues = await baseRevenuesQuery.where('user_id', this.user.id).fetch()
    }

    return {
      expenses,
      revenues
    }
  }
}

module.exports = ReportService
