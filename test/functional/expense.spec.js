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
    value: '150,50'
  })

  const response = await client
    .post('/expenses')
    .loginVia(user, 'jwt')
    .send(expense.toJSON())
    .end()

  response.assertStatus(201)

  assert.equal(response.body.expense.family_id, family.id)
  assert.equal(response.body.expense.user_id, user.id)
  assert.equal(response.body.expense.category_id, category.id)
  assert.equal(response.body.expense.date, response.body.expense.created_at)
  assert.isNotNull(response.body.expense.date)
  assert.isNumber(response.body.expense.value)
})

test('it should be able to view a family expense', async ({
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
  assert.equal(response.body.category_id, category.id)
  assert.equal(response.body.date, expense.date)
  assert.isNotNull(response.body.date)
  assert.isNumber(response.body.value)
})

//
//
// verificar se o endpoint verifica o tipo
// const expenseCategory = await Category.find(response.body.expense.category_id)
//
// assert.equal(category.type, expenseCategory.type)
//
//

// test('it should be able to show a category', async ({ assert, client }) => {
//   const user = await Factory.model('App/Models/User').create()
//   const family = await Factory.model('App/Models/Family').create()

//   await family.users().save(user)

//   const category = await Factory.model('App/Models/Category').create({
//     family_id: family.id
//   })

//   const response = await client
//     .get(`categories/${category.id}`)
//     .loginVia(user, 'jwt')
//     .end()

//   response.assertStatus(200)

//   assert.equal(response.body.id, category.id)
//   assert.equal(response.body.family_id, family.id)
// })
