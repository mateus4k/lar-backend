const { test, trait } = use('Test/Suite')('Accept Rules')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Hooks')} */
const UserHook = use('App/Models/Hooks/UserHook')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('it should be able to accept rules', async ({ client, assert }) => {
  const originalHashPasswordHook = UserHook.hashPassword

  UserHook.hashPassword = () => null

  const user = await Factory.model('App/Models/User').create({
    password: '123456'
  })

  UserHook.hashPassword = originalHashPasswordHook

  const response = await client
    .post('/accept_rules')
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)

  await user.reload()

  assert.isTrue(!!user.accepted_terms)
})
