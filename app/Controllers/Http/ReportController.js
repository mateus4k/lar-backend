'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

const ReportService = use('App/Services/ReportService')

class ReportController {
  constructor() {
    this.reportService = new ReportService()
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index({ request, response, auth }) {
    const reports = await this.reportService.index({
      family: request.family,
      user: auth.user
    })

    return response.status(200).json({ ...reports })
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {}
}

module.exports = ReportController
