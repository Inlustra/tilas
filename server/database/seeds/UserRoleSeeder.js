'use strict'

const Config = use('Config')

/*
|--------------------------------------------------------------------------
| UserRoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')
const Factory = use('Factory')

class UserRoleSeeder {
  async run () {
    const admin = await Database.table('roles').insert(Config.get('auth.roles.admin'))
    const banned = await Database.table('roles').insert(Config.get('auth.roles.banned'))
  }
}

module.exports = UserRoleSeeder
