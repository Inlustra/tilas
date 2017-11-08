'use strict'

const Schema = use('Schema')

class TiklsTableSchema extends Schema {

  up () {
    this.create('tils', (table) => {
      table.increments()
      table.string('text', 240).notNullable();
      table.string('snippet');
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('tils')
  }

}

module.exports = TiklsTableSchema
