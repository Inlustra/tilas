'use strict'

const Model = use('Model')

class Role extends Model {

  users() {
    return this.belongsToMany('App/Models/User')
      .withTimestamps()
  }
}

module.exports = Role
