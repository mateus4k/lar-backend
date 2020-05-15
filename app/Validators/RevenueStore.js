'use strict'

/** @typedef {import('@adonisjs/validator/src/Validator')} Validator */
const { rule } = use('Validator')

class RevenueStore {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      category_id: [rule('required'), rule('exists', ['categories', 'id'])],
      note: [rule('max', 254)],
      value: [rule('required'), rule('number')],
      date: [rule('date')]
    }
  }
}

module.exports = RevenueStore
