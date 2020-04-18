const { test, trait } = use('Test/Suite')('Forgot Password')

const Mail = use('Mail')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should send an email with reset password instructions', async ({
  assert,
  client
}) => {
  Mail.fake()

  const forgotPayload = {
    email: 'mateus4k@protonmail.ch'
  }

  const user = await Factory.model('App/Models/User').create(forgotPayload)

  const response = await client.post('/forgot').send(forgotPayload).end()

  response.assertStatus(204)

  const recentEmail = Mail.pullRecent()

  assert.equal(recentEmail.message.to[0].address, forgotPayload.email)

  const token = await user.tokens().first()

  assert.include(token.toJSON(), {
    user_id: user.id,
    type: 'forgotpassword'
  })

  Mail.restore()
})
