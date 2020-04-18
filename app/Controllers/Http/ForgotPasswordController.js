'use strict'

const { randomBytes } = require('crypto')
const { promisify } = require('util')

const Env = use('Env')
const Mail = use('Mail')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input('email')

    const user = await User.findByOrFail('email', email)

    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')

    await user.tokens().create({
      token,
      type: 'forgotpassword'
    })

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`

    await Mail.send(
      'emails.forgotpassword',
      { name: user.name, resetPasswordUrl },
      (message) => {
        message
          .to(user.email)
          .from('mateus4k@protonmail.ch')
          .subject('LAR - Recuperação de Senha')
      }
    )
  }
}

module.exports = ForgotPasswordController
