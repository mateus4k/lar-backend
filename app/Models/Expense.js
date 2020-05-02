'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Expense extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  family() {
    return this.belongsTo('App/Models/Family')
  }

  category() {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Expense
