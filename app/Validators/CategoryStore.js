'use strict'

/** @typedef {import('@adonisjs/validator/src/Validator')} Validator */
const { rule } = use('Validator')

class Category {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: [rule('required'), rule('max', 254)],
      icon: [rule('required'), rule('max', 50)],
      color: [rule('required'), rule('starts_with', '#'), rule('max', 7)],
      type: [rule('required'), rule('in', ['revenue', 'expense'])]
    }
  }
}

module.exports = Category
