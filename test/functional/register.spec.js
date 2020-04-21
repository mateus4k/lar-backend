const { test, trait } = use('Test/Suite')('Register')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should return a new user', async ({ assert, client }) => {
  const sessionPayload = {
    name: 'Mateus Sampaio',
    email: 'mateus4k@protonmail.ch',
    password: '123456'
  }

  const response = await client.post('/register').send(sessionPayload).end()

  response.assertStatus(200)
  assert.exists(response.body.user.id)
})

test('it should not allow two users with the same email', async ({
  client
}) => {
  const sessionPayload = {
    name: 'Mateus Sampaio',
    email: 'mateus4k@protonmail.ch',
    password: '123456'
  }

  await client.post('/register').send(sessionPayload).end()
  const response = await client.post('/register').send(sessionPayload).end()

  response.assertStatus(400)
})
