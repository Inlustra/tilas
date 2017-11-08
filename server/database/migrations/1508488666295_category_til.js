'use strict'

const Schema = use('Schema')

class CategoryTilTableSchema extends Schema {

  up () {
    this.create('category_til', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
    })
  }

  down () {
    this.drop('category_til');
  }

}

module.exports = CategoryTilTableSchema
