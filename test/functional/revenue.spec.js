const { test, trait } = use('Test/Suite')('Revenue')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Revenue = use('App/Models/Revenue')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('it should be able to list family revenues', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  const revenue = await Factory.model('App/Models/Revenue').create({
    family_id: family.id,
    user_id: user.id,
    category_id: category.id
  })

  const response = await client.get('/revenues').loginVia(user, 'jwt').end()

  response.assertStatus(200)

  assert.equal(response.body.revenues[0].family_id, family.id)
  assert.equal(response.body.revenues[0].user_id, user.id)
  assert.equal(response.body.revenues[0].category_id, category.id)
  assert.equal(response.body.revenues[0].date, revenue.date)
  assert.isNotNull(response.body.revenues[0].date)
  assert.isNumber(response.body.revenues[0].value)
})

test('it should be able to create a new revenue', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  const revenue = await Factory.model('App/Models/Revenue').create({
    category_id: category.id,
    user_id: user.id,
    value: 299.99
  })

  const response = await client
    .post('/revenues')
    .loginVia(user, 'jwt')
    .send(revenue.toJSON())
    .end()

  response.assertStatus(201)

  const revenueCategory = await Category.findOrFail(
    response.body.revenue.category_id
  )

  assert.equal(response.body.revenue.family_id, family.id)
  assert.equal(response.body.revenue.user_id, user.id)
  assert.equal(response.body.revenue.category_id, category.id)
  assert.equal(revenueCategory.type, category.type)
  assert.isNotNull(response.body.revenue.date)
  assert.isNumber(response.body.revenue.value)
})

test('it should not be able to create a new revenue with not an revenue category', async ({
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'expense'
  })

  const revenue = await Factory.model('App/Models/Revenue').create({
    category_id: category.id,
    user_id: user.id,
    value: 299.99
  })

  const response = await client
    .post('/revenues')
    .loginVia(user, 'jwt')
    .send(revenue.toJSON())
    .end()

  response.assertStatus(401)
})

test('it should be able to show a family revenue', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  const revenue = await Factory.model('App/Models/Revenue').create({
    family_id: family.id,
    user_id: user.id,
    category_id: category.id
  })

  const response = await client
    .get(`/revenues/${revenue.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  assert.equal(response.body.family_id, family.id)
  assert.equal(response.body.user_id, user.id)
  assert.equal(response.body.user.name, user.name)
  assert.equal(response.body.category_id, category.id)
  assert.equal(response.body.category.name, category.name)
  assert.equal(response.body.date, revenue.date)
  assert.isNotNull(response.body.date)
  assert.isNumber(response.body.value)
})

test('the family leader should be able to update a existent revenue', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  const newCategory = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  const revenue = await Factory.model('App/Models/Revenue').create({
    family_id: family.id,
    user_id: user.id,
    category_id: category.id
  })

  const revenuePayload = {
    note: 'AdonisJs',
    value: 182.32,
    date: new Date().toISOString(),
    category_id: newCategory.id
  }

  const response = await client
    .put(`/revenues/${revenue.id}`)
    .loginVia(user, 'jwt')
    .send({ ...revenuePayload })
    .end()

  await revenue.reload()

  response.assertStatus(204)

  assert.plan(3)
  assert.equal(revenue.note, revenuePayload.note)
  assert.equal(revenue.value, revenuePayload.value)
})

test('the family leader should be able to update a existent revenue', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  const newCategory = await Factory.model('App/Models/Category').create({
    type: 'expense'
  })

  const revenue = await Factory.model('App/Models/Revenue').create({
    family_id: family.id,
    user_id: user.id,
    category_id: category.id
  })

  const revenuePayload = {
    category_id: newCategory.id
  }

  const response = await client
    .put(`/revenues/${revenue.id}`)
    .loginVia(user, 'jwt')
    .send({ ...revenuePayload })
    .end()

  await revenue.reload()

  response.assertStatus(401)
  response.assertError({
    error: 'Category type must be revenue.'
  })

  assert.equal(revenue.category_id, category.id)
})

test('it should be able delete an revenue', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create({
    user_id: user.id
  })

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  let revenue = await Factory.model('App/Models/Revenue').create({
    family_id: family.id,
    category_id: category.id,
    user_id: user.id,
    value: 299.99
  })

  const response = await client
    .delete(`revenues/${revenue.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)

  revenue = await Revenue.query().withTrashed().where('id', revenue.id).first()

  assert.exists(revenue.id)
  assert.isNotNull(revenue.deleted_at)
  assert.isTrue(revenue.isTrashed)
})

test('only the family leader should be able to delete an revenue', async ({
  assert,
  client
}) => {
  const leadingUser = await Factory.model('App/Models/User').create()
  const commonUser = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create({
    user_id: leadingUser.id
  })

  await family.users().save(leadingUser)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  let revenue = await Factory.model('App/Models/Revenue').create({
    family_id: family.id,
    category_id: category.id,
    user_id: leadingUser.id,
    value: 299.99
  })

  const response = await client
    .delete(`revenues/${revenue.id}`)
    .loginVia(commonUser, 'jwt')
    .end()

  response.assertStatus(401)

  revenue = await Revenue.query().withTrashed().where('id', revenue.id).first()

  assert.exists(revenue.id)
  assert.isNull(revenue.deleted_at)
  assert.isFalse(revenue.isTrashed)
})
