'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FamilySchema extends Schema {
  up() {
    this.create('families', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .unique()
      table.string('name', 254)
      table.string('code', 8).unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('families')
  }
}

module.exports = FamilySchema
