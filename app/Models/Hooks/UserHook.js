'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const UserHook = (exports = module.exports = {})

UserHook.hashPassword = async (userInstance) => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}
