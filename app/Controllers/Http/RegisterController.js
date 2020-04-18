'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class RegisterController {
  async store({ request }) {
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
}

module.exports = RegisterController
