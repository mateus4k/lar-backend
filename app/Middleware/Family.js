'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

class Family {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    const family = await auth.user.family().first()

    if (!family) {
      return response.status(401).send()
    }

    request.family = family

    await next()
  }
}

module.exports = Family
