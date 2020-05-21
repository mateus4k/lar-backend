'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Request')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Family = use('App/Models/Family')

class RegisterController {
  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   */
  async store({ request, response }) {
    const { name, email, password } = request.only([
      'name',
      'email',
      'password'
    ])

    const user = await User.create({
      name,
      email,
      password
    })

    return { user }
  }

  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   */
  async update({ response, params, auth }) {
    const familyCode = params.family_code

    const family = await Family.findByOrFail('code', familyCode)

    const user = await auth.getUser()

    await user.family().associate(family)

    user.family_id = family.id
    user.save()

    return response.status(204).send()
  }
}

module.exports = RegisterController
