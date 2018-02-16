'use strict'

const User = use('App/Models/User')

class TilsController {

  async createPost() {

  }

  async listUserPosts({request, auth, params}) {
    const userId = params.id;
    const user = await User.findOrFail(userId);
    return await user.tils().fetch();
  }

}

module.exports = TilsController
