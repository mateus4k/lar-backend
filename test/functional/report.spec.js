/** @type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Report')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Hooks')} */
const FamilyHook = use('App/Models/Hooks/FamilyHook')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Hooks')} */
const UserHook = use('App/Models/Hooks/UserHook')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

async function createUserAndFamily() {
  const originalHashPasswordHook = UserHook.hashPassword
  const originalCategoriesHook = FamilyHook.createDefaultCategories

  UserHook.hashPassword = () => {
    return null
  }

  FamilyHook.createDefaultCategories = () => {
    return null
  }

  const user = await Factory.model('App/Models/User').create({
    password: '12345678'
  })
  const family = await Factory.model('App/Models/Family').create()

  UserHook.hashPassword = originalHashPasswordHook
  FamilyHook.createDefaultCategories = originalCategoriesHook

  await family.users().save(user)

  return { user, family }
}

async function createCategory(type) {
  if (type !== 'expense' && type !== 'revenue') {
    return null
  }

  const category = await Factory.model('App/Models/Category').create({ type })

  return category
}

async function createExpenses({ quantity = 1, user, family }) {
  const category = await createCategory('expense')

  const expenses = await Factory.model('App/Models/Expense').createMany(
    quantity,
    {
      family_id: family.id,
      user_id: user.id,
      category_id: category.id
    }
  )

  return { expenses: expenses.map((expense) => expense.toJSON()) }
}

async function createRevenues({ quantity = 1, user, family }) {
  const category = await createCategory('revenue')

  const revenues = await Factory.model('App/Models/Revenue').createMany(
    quantity,
    {
      family_id: family.id,
      user_id: user.id,
      category_id: category.id
    }
  )

  return { revenues: revenues.map((revenue) => revenue.toJSON()) }
}

test('the lead user should be able to list family reports', async ({
  client
}) => {
  const { user, family } = await createUserAndFamily()
  const { revenues } = await createRevenues({ quantity: 2, user, family })
  const { expenses } = await createExpenses({ quantity: 3, user, family })

  const response = await client.get('/reports').loginVia(user, 'jwt').end()

  response.assertStatus(200)

  response.assertJSONSubset({
    revenues,
    expenses
  })
})

test('the common user should be able to list your own reports', async ({
  client
}) => {
  const { family } = await createUserAndFamily()

  const user = await Factory.model('App/Models/User').create({
    password: '12345678',
    family_id: family.id
  })

  const { revenues } = await createRevenues({ quantity: 2, user, family })
  const { expenses } = await createExpenses({ quantity: 3, user, family })

  const response = await client.get('/reports').loginVia(user, 'jwt').end()

  response.assertStatus(200)

  response.assertJSONSubset({
    revenues,
    expenses
  })
})

test('the lead user should be able to list family expenses grouped by categories', async ({
  assert,
  client
}) => {
  const { user, family } = await createUserAndFamily()
  const { expenses } = await createExpenses({ quantity: 3, user, family })

  const response = await client
    .get('/reports?by=category&get=expenses')
    .loginVia(user, 'jwt')
    .end()

  let categories = await family
    .categories()
    .with('expenses')
    .withCount('expenses as total_expenses')
    .fetch()

  categories = categories.toJSON()

  response.assertStatus(200)

  response.assertJSONSubset({
    categories
  })

  assert.containsAllKeys(categories[0].expenses[0], expenses[0])
})

test('the lead user should be able to list family revenues grouped by categories', async ({
  assert,
  client
}) => {
  const { user, family } = await createUserAndFamily()
  const { revenues } = await createRevenues({ quantity: 3, user, family })

  const response = await client
    .get('/reports?by=category&get=revenues')
    .loginVia(user, 'jwt')
    .end()

  let categories = await family
    .categories()
    .with('revenues')
    .withCount('revenues as total_revenues')
    .fetch()

  categories = categories.toJSON()

  response.assertStatus(200)

  response.assertJSONSubset({
    categories
  })

  assert.containsAllKeys(categories[0].revenues[0], revenues[0])
})

test('the common user should be able to list your own expenses grouped by categories', async ({
  assert,
  client
}) => {
  const { family } = await createUserAndFamily()

  const user = await Factory.model('App/Models/User').create({
    id: 78,
    password: '12345678',
    family_id: family.id
  })

  const { expenses } = await createExpenses({ quantity: 3, user, family })

  const response = await client
    .get('/reports?by=category&get=expenses')
    .loginVia(user, 'jwt')
    .end()

  let categories = await family
    .categories()
    .with('expenses')
    .withCount('expenses as total_expenses')
    .fetch()

  categories = categories.toJSON()

  response.assertStatus(200)

  response.assertJSONSubset({
    categories
  })

  assert.containsAllKeys(categories[0].expenses[0], expenses[0])
})

test('the common user should be able to list your own revenues grouped by categories', async ({
  assert,
  client
}) => {
  const { family } = await createUserAndFamily()

  const user = await Factory.model('App/Models/User').create({
    id: 78,
    password: '12345678',
    family_id: family.id
  })

  const { revenues } = await createRevenues({ quantity: 3, user, family })

  const response = await client
    .get('/reports?by=category&get=revenues')
    .loginVia(user, 'jwt')
    .end()

  let categories = await family
    .categories()
    .with('revenues')
    .withCount('revenues as total_revenues')
    .fetch()

  categories = categories.toJSON()

  response.assertStatus(200)

  response.assertJSONSubset({
    categories
  })

  assert.containsAllKeys(categories[0].revenues[0], revenues[0])
})
