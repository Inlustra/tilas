'use strict'

const Model = use('Model')

class Role extends Model {

  static get hidden() {
    return []
  }

  users() {
    return this.belongsToMany('App/Models/User')
      .withTimestamps()
  }

}

module.exports = Role
