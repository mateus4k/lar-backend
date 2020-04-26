'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Family extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', 'FamilyHook.createCode')
    this.addHook('afterCreate', 'FamilyHook.createDefaultCategories')
  }

  leader() {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }

  users() {
    return this.hasMany('App/Models/User', 'id', 'family_id')
  }

  categories() {
    return this.hasMany('App/Models/Category', 'id', 'family_id')
  }
}

module.exports = Family
