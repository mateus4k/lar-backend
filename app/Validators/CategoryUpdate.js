'use strict'

/** @typedef {import('@adonisjs/validator/src/Validator')} Validator */
const { rule } = use('Validator')

class CategoryUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: [rule('max', 254)],
      icon: [rule('max', 50)],
      color: [rule('starts_with', '#'), rule('max', 7)]
    }
  }
}

module.exports = CategoryUpdate
