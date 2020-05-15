'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  static get hidden() {
    return ['password']
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  family() {
    return this.belongsTo('App/Models/Family', 'family_id', 'id')
  }

  expenses() {
    return this.hasMany('App/Models/Expense')
  }

  revenues() {
    return this.hasMany('App/Models/Revenue')
  }
}

module.exports = User
