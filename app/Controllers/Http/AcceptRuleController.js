'use strict'

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class AcceptRuleController {
  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async store({ response, auth }) {
    const user = await auth.getUser()

    user.accepted_terms = true

    await user.save()

    return response.status(204).send()
  }
}

module.exports = AcceptRuleController
