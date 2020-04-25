'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  family() {
    return this.belongsTo('App/Models/Family', 'family_id', 'id')
  }

  static get hidden() {
    return ['password']
  }
}

module.exports = User
