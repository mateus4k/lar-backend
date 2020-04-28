'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  static boot() {
    super.boot()

    this.addTrait('SoftDelete')
  }

  static get deleteTimestamp() {
    return 'deleted_at/null'
  }
}

module.exports = Category
