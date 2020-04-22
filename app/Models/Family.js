'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Family extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', 'FamilyHook.createCode')
  }

  user() {
    return this.hasOne('App/Models/User')
  }

  users() {
    return this.belongsToMany('App/Models/User')
      .pivotTable('family_users')
      .withTimestamps()
  }
}

module.exports = Family
