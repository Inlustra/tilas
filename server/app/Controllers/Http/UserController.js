'use strict'

const User = use('App/Models/User')

class UserController {

  async update({ request, auth }) {
    const { email, password, name, roles } = request.all()
  }

}

module.exports = UserController
