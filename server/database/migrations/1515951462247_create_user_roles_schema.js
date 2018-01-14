'use strict'

const Schema = use('Schema')

class CreateUserRolesSchema extends Schema {
  up () {
    this.create('roles', table => {
      table.increments()
      table.string('type')
    })
    this.create('user_roles', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_roles')
    this.drop('roles')
  }
}

module.exports = CreateUserRolesSchema
