'use strict'

const Schema = use('Schema')

class TilsTableSchema extends Schema {

  up () {
    this.create('tils', (table) => {
      table.increments()
      table.string('text', 240).notNullable();
      table.string('snippet');
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
    this.create('category_til', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
    })
  }

  down () {
    this.drop('category_til');
    this.drop('tils')
  }

}

module.exports = TilsTableSchema
