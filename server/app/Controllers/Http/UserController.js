'use strict'

const User = use('App/Models/User');

class UserController {

  async register({ request, auth }) {
    const {
      email,
      password,
      name
    } = request.all();

    const user = await User.create({
      name,
      email,
      password
    });

    const token = await auth.generate(user);

    return {
      user,
      token
    };
  }

  async login({ request, auth }) {
    const email = request.input('email');
    const password = request.input('password');
    try {
      await auth.attempt(email, password);
      const user = await User.query().where('email', email).first();
      const token = await auth.generate(user);
      response.json({
        token,
        user
      });
    } catch (e) {
      response.unauthorized('Invalid credentails');
    }
  }
}

module.exports = UserController
