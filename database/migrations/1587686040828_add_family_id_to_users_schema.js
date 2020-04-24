'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFamilyIdToUsersSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table
        .integer('family_id')
        .references('id')
        .inTable('families')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .after('id')
        .unsigned()
        .nullable()
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('family_id')
    })
  }
}

module.exports = AddFamilyIdToUsersSchema
