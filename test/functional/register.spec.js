const { test, trait } = use('Test/Suite')('Register')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('it should return a new user', async ({ assert, client }) => {
  const sessionPayload = {
    name: 'Mateus Sampaio',
    email: 'mateus@mateus.com',
    password: '123456'
  }

  const response = await client.post('/register').send(sessionPayload).end()

  response.assertStatus(200)
  assert.exists(response.body.user.id)
})
