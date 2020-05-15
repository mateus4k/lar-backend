'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RevenueSchema extends Schema {
  up() {
    this.create('revenues', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('family_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.string('note', 254).nullable()
      table.float('value').unsigned()
      table.timestamp('date').defaultTo(this.fn.now())
      table.timestamp('deleted_at')
      table.timestamps()
    })
  }

  down() {
    this.drop('revenues')
  }
}

module.exports = RevenueSchema
