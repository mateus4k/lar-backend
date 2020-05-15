'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
    ...data
  }
})

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ length: 20 }),
    ...data
  }
})

Factory.blueprint('App/Models/Family', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    ...data
  }
})

Factory.blueprint('App/Models/Category', (faker, i, data = {}) => {
  return {
    family_id: 1,
    name: faker.word(),
    icon: faker.word(),
    color: faker.color({ format: 'hex', casing: 'upper' }),
    type: faker.pickone(['revenue', 'expense']),
    ...data
  }
})

Factory.blueprint('App/Models/Expense', (faker, i, data = {}) => {
  return {
    note: faker.sentence({ words: 3 }),
    value: faker.floating({ min: 0, max: 99999999, fixed: 2 }),
    date: new Date().toISOString(),
    ...data
  }
})

Factory.blueprint('App/Models/Revenue', (faker, i, data = {}) => {
  return {
    note: faker.sentence({ words: 3 }),
    value: faker.floating({ min: 0, max: 99999999, fixed: 2 }),
    date: new Date().toISOString(),
    ...data
  }
})
