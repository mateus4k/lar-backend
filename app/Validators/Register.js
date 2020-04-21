'use strict'

class Register {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|max:254',
      email: 'required|email|unique:users',
      password: 'required|max:60'
    }
  }
}

module.exports = Register
