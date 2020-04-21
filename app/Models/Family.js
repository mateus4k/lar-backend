'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Family extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', async (familyInstance) => {
      let code = Math.round(Math.random() * 100)

      code += new Date()
        .getTime()
        .toString(16)
        .split('')
        .reverse()
        .join('')
        .slice(0, 10)

      code = code.slice(0, 8)

      familyInstance.code = code
    })
  }

  user() {
    return this.hasOne('App/Models/User')
  }
}

module.exports = Family
