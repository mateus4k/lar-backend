const { test, trait } = use('Test/Suite')('Accept Rules')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('it should not allow two users with the same email', async ({
  client,
  assert
}) => {
  const userFactory = await Factory.model('App/Models/User').make()

  const user = await User.create({
    ...userFactory.toJSON(),
    password: '123456'
  })

  const response = await client
    .post('/accept_rules')
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)

  await user.reload()

  assert.isTrue(!!user.accepted_terms)
})
