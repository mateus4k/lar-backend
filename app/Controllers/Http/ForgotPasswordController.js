'use strict'

const { randomBytes } = require('crypto')
const { promisify } = require('util')

const Mail = use('Mail')
const Config = use('Config')

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

    const resetPasswordUrl = `${Config.get(
      'app.frontUrl'
    )}/reset?token=${token}`

    await Mail.send(
      'emails.forgotpassword',
      { name: user.name, resetPasswordUrl },
      (message) => {
        message
          .to(user.email)
          .from(Config.get('mail.smtp.host'))
          .subject(`${Config.get('app.name')} - Recuperação de Senha`)
      }
    )
  }
}

module.exports = ForgotPasswordController
