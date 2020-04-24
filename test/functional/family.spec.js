const { test, trait } = use('Test/Suite')('Family')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Family = use('App/Models/Family')

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

test('it should be a null user foreign key after deleting the user', async ({
  assert
}) => {
  const userFactory = await Factory.model('App/Models/User').make()

  const familyFactory = await Factory.model('App/Models/Family').make({
    user_id: userFactory.id
  })

  const user = await User.create({
    ...userFactory.toJSON(),
    password: '123456'
  })

  const factory = await Family.create(familyFactory.toJSON())

  await user.delete()

  await factory.reload()

  assert.isNull(factory.user_id)
})

test('it should be able to associate a user to a existent family by code', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  const response = await client
    .put(`register/${family.code}/associate`)
    .loginVia(user, 'jwt')
    .end()

  await family.load('users')

  assert.equal(family.toJSON().users[0].id, user.id)

  response.assertStatus(204)
})
