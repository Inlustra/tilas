'use strict'

const Model = use('Model')

class Category extends Model {

  tils () {
    return this.hasMany('App/Model/Til')
  }

  subcategories () {
    return this.hasMany('App/Model/Category', 'parent_category_id')
  }

  parentCategory () {
    return this.belongsTo('App/Model/Category', 'parent_category_id');
  }

}

module.exports = Category
