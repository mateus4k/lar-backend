'use strict'

/** @typedef {import('@adonisjs/validator/src/Validator')} Validator */
const { rule } = use('Validator')

class Family {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: [rule('required'), rule('max', 254)]
    }
  }
}

module.exports = Family
