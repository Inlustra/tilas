'use strict'

const Lucid = use('Lucid')

class Til extends Lucid {

  user() {
    return this.belongsTo('App/Model/User')
  }

  categories() {
    return this.hasMany('App/Model/Category')
  }

}

module.exports = Token
