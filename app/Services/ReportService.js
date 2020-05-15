'use strict'

/** @typedef {import('@adonisjs/lucid/src/Lucid/Model')} Family */
/** @typedef {import('@adonisjs/lucid/src/Lucid/Model')} User */

class ReportService {
  /**
   * @param {object} ctx
   * @param {Family} ctx.family
   * @param {User} ctx.user
   */
  async index({ family, user }) {
    let expenses, revenues

    const leader = await family.leader().first()
    const userIsLeader = user.id === leader.id

    if (userIsLeader) {
      expenses = await family.expenses().fetch()
      revenues = await family.revenues().fetch()
    } else {
      expenses = await family.expenses().where('user_id', user.id).fetch()
      revenues = await family.revenues().where('user_id', user.id).fetch()
    }

    return {
      expenses,
      revenues
    }
  }
}

module.exports = ReportService
