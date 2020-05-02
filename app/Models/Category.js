'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  static boot() {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  static get deleteTimestamp() {
    return 'deleted_at/null'
  }

  expenses() {
    return this.hasMany('App/Models/Expense')
  }
}

module.exports = Category
