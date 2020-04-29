const { test, trait } = use('Test/Suite')('Categories')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('standard categories should be created after creating a family', async ({
  assert
}) => {
  const family = await Factory.model('App/Models/Family').create()

  const categories = await family.categories().fetch()

  assert.equal(categories.toJSON()[0].family_id, family.id)
})

test('it should be able to list family categories', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const response = await client.get('categories').loginVia(user, 'jwt').end()

  response.assertStatus(200)

  assert.equal(response.body.categories[0].family_id, family.id)
})

test('it should be able to create a new category', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create()

  const response = await client
    .post('/categories')
    .loginVia(user, 'jwt')
    .send(category.toJSON())
    .end()

  response.assertStatus(201)

  assert.equal(response.body.category.family_id, family.id)
})

test('it should be able to show a category', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    family_id: family.id
  })

  const response = await client
    .get(`categories/${category.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  assert.equal(response.body.id, category.id)
  assert.equal(response.body.family_id, family.id)
})

test('it should be able to update a existent category', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    name: 'Food'
  })

  const categoryPayload = {
    name: 'Market'
  }

  const response = await client
    .put(`/categories/${category.id}`)
    .loginVia(user, 'jwt')
    .send({ ...categoryPayload })
    .end()

  await category.reload()

  response.assertStatus(204)
  assert.equal(category.name, categoryPayload.name)
})
