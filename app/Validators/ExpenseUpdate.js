'use strict'

/** @typedef {import('@adonisjs/validator/src/Validator')} Validator */
const { rule } = use('Validator')

class ExpenseUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      category_id: [rule('exists', ['categories', 'id'])],
      note: [rule('max', 254)],
      value: [rule('number')],
      date: [rule('date')]
    }
  }
}

module.exports = ExpenseUpdate
