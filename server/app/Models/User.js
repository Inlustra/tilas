'use strict'

const Model = use('Model')

class User extends Model {

  static get hidden () {
    return ['password']
  }

  static boot() {
    super.boot()
    /**
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeSave', 'User.hashPassword')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  tils() {
    return this.hasMany('App/Model/Til')
  }
}

module.exports = User
