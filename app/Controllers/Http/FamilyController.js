'use strict'

/** @typedef {import('@adonisjs/framework/src/Context')} Context */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Family = use('App/Models/Family')

class FamilyController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const name = request.input('name')

    const user = await auth.getUser()

    const checkFamily = await Family.findBy('user_id', user.id)

    if (checkFamily) {
      return response.status(400).json({ error: 'User already have a family' })
    }

    const family = await Family.create({
      user_id: user.id,
      name
    })

    user.family_id = family.id
    await user.save()

    return response.status(201).json(family)
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

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

module.exports = FamilyController
