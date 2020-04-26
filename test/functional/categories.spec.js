const { test, trait } = use('Test/Suite')('Family')

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
