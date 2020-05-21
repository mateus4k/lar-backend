const { test, trait } = use('Test/Suite')('Expense')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Expense = use('App/Models/Expense')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('it should be able to list family expenses', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'expense'
  })

  const expense = await Factory.model('App/Models/Expense').create({
    family_id: family.id,
    user_id: user.id,
    category_id: category.id
  })

  const response = await client.get('/expenses').loginVia(user, 'jwt').end()

  response.assertStatus(200)

  assert.equal(response.body.expenses[0].family_id, family.id)
  assert.equal(response.body.expenses[0].user_id, user.id)
  assert.equal(response.body.expenses[0].category_id, category.id)
  assert.equal(response.body.expenses[0].date, expense.date)
  assert.isNotNull(response.body.expenses[0].date)
  assert.isNumber(response.body.expenses[0].value)
})

test('it should be able to create a new expense', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'expense'
  })

  const expense = await Factory.model('App/Models/Expense').create({
    category_id: category.id,
    user_id: user.id,
    value: 150.5
  })

  const response = await client
    .post('/expenses')
    .loginVia(user, 'jwt')
    .send(expense.toJSON())
    .end()

  response.assertStatus(201)

  const expenseCategory = await Category.findOrFail(
    response.body.expense.category_id
  )

  assert.equal(response.body.expense.family_id, family.id)
  assert.equal(response.body.expense.user_id, user.id)
  assert.equal(response.body.expense.category_id, category.id)
  assert.equal(expenseCategory.type, category.type)
  assert.isNotNull(response.body.expense.date)
  assert.isNumber(response.body.expense.value)
})

test('it should not be able to create a new expense with not an expense category', async ({
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'revenue'
  })

  const expense = await Factory.model('App/Models/Expense').create({
    category_id: category.id,
    user_id: user.id,
    value: 150.5
  })

  const response = await client
    .post('/expenses')
    .loginVia(user, 'jwt')
    .send(expense.toJSON())
    .end()

  response.assertStatus(401)
})

test('it should be able to show a family expense', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create()

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'expense'
  })

  const expense = await Factory.model('App/Models/Expense').create({
    family_id: family.id,
    user_id: user.id,
    category_id: category.id
  })

  const response = await client
    .get(`/expenses/${expense.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  assert.equal(response.body.family_id, family.id)
  assert.equal(response.body.user_id, user.id)
  assert.equal(response.body.user.name, user.name)
  assert.equal(response.body.category_id, category.id)
  assert.equal(response.body.category.name, category.name)
  assert.equal(response.body.date, expense.date)
  assert.isNumber(response.body.value)
})

test('it should be able delete an expense', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create({
    user_id: user.id
  })

  await family.users().save(user)

  const category = await Factory.model('App/Models/Category').create({
    type: 'expense'
  })

  let expense = await Factory.model('App/Models/Expense').create({
    family_id: family.id,
    category_id: category.id,
    user_id: user.id,
    value: 150.5
  })

  const response = await client
    .delete(`expenses/${expense.id}`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)

  expense = await Expense.query().withTrashed().where('id', expense.id).first()

  assert.exists(expense.id)
  assert.isNotNull(expense.deleted_at)
  assert.isTrue(expense.isTrashed)
})

test('only the family leader should be able to delete an expense', async ({
  assert,
  client
}) => {
  const leadingUser = await Factory.model('App/Models/User').create()
  const commonUser = await Factory.model('App/Models/User').create()
  const family = await Factory.model('App/Models/Family').create({
    user_id: leadingUser.id
  })

  await family.users().save(leadingUser)
  await family.users().save(commonUser)

  const category = await Factory.model('App/Models/Category').create({
    type: 'expense'
  })

  let expense = await Factory.model('App/Models/Expense').create({
    family_id: family.id,
    category_id: category.id,
    user_id: leadingUser.id
  })

  const response = await client
    .delete(`expenses/${expense.id}`)
    .loginVia(commonUser, 'jwt')
    .end()

  response.assertStatus(401)
  response.assertError({
    error: 'You need to be a family leader to delete a expense.'
  })

  expense = await Expense.query().withTrashed().where('id', expense.id).first()

  assert.exists(expense.id)
  assert.isNull(expense.deleted_at)
  assert.isFalse(expense.isTrashed)
})
