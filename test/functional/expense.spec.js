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
