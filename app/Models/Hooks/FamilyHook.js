'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Family = use('App/Models/Family')

const { randomBytes } = require('crypto')
const { promisify } = require('util')

const FamilyHook = (exports = module.exports = {})

FamilyHook.createCode = async (family) => {
  const random = await promisify(randomBytes)(8)
  const code = random.toString('hex').slice(0, 8).toUpperCase()

  const codeAlreadyExists = await Family.findBy('code', code)

  if (codeAlreadyExists) {
    this.createCode(family)
  }

  family.code = code
}
