'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table.increments()
      table
        .integer('family_id')
        .unsigned()
        .references('id')
        .inTable('families')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('name', 254).notNullable()
      table.string('icon', 50)
      table.string('color', 7).notNullable()
      table.enu('type', ['revenue', 'expense']).notNullable()
      table.timestamp('deleted_at')
      table.timestamps()
    })
  }

  down() {
    this.drop('categories')
  }
}

module.exports = CategorySchema
