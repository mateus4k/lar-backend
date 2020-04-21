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
        .unique()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('name', 254).notNullable()
      table.string('code', 8).notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('families')
  }
}

module.exports = FamilySchema
