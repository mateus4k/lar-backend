'use strict'

class Register {
  get rules() {
    return {
      name: 'required|max:254',
      email: 'email|required',
      password: 'required'
    }
  }
}

module.exports = Register
