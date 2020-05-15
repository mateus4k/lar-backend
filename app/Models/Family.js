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
    return this.hasOne('App/Models/User')
  }

  users() {
    return this.hasMany('App/Models/User')
  }

  categories() {
    return this.hasMany('App/Models/Category')
  }

  expenses() {
    return this.hasMany('App/Models/Expense')
  }

  revenues() {
    return this.hasMany('App/Models/Revenue')
  }
}

module.exports = Family
