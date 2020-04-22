'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Family = use('App/Models/Family')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const FamilyUser = use('App/Models/FamilyUser')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Request')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

class FamilyUserController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ response, params, auth }) {
    const familyCode = params.family_code

    const family = await Family.findBy('code', familyCode)

    const user = await auth.getUser()

    await family.users().attach(user.id)

    return response.status(204).send()
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}
}

module.exports = FamilyUserController
