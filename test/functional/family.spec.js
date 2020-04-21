const { test, trait } = use('Test/Suite')('Family')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('it should be able to create a new family', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const { name } = await Factory.model('App/Models/Family').make()

  const response = await client
    .post('/families')
    .loginVia(user, 'jwt')
    .send({ name })
    .end()

  response.assertStatus(201)
  assert.exists(response.body.id)
  assert.isTrue(response.body.code.length === 8)
})

test('it should not be able to create more than one family with the same user', async ({
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const family = await Factory.model('App/Models/Family').make()

  await client
    .post('/families')
    .loginVia(user, 'jwt')
    .send(family.toJSON())
    .end()

  const response = await client
    .post('/families')
    .loginVia(user, 'jwt')
    .send(family.toJSON())
    .end()

  response.assertStatus(400)
})
