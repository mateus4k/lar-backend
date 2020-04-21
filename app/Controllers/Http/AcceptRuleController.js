'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with acceptrules
 */
class AcceptRuleController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = await auth.getUser()

    user.accepted_terms = true

    await user.save()

    return response.status(204).send()
  }
}

module.exports = AcceptRuleController
