'use strict'

const User = use('App/Models/User')

const adminRole = use('Config').get('auth.roles.admin');

const UserAlreadyExistsException = use(
  'App/Exceptions/UserAlreadyExistsException',
)

class AuthController {

  async register({ request, auth }) {
    const { email, password, name } = request.all()
    const userAlreadyExists = await User.query()
      .where('email', email)
      .getCount()

    if (userAlreadyExists) {
      throw new UserAlreadyExistsException()
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    await user.roles().attach([adminRole.id])
    await user.load('roles')

    const token = await auth.withRefreshToken().generate(user)

    return { user, token }
  }

  async login({ request, response, auth }) {
    const email = request.input('email')
    const password = request.input('password')
    await auth.attempt(email, password)
    const user = await User.query()
      .where('email', email)
      .with('roles')
      .first()
    const token = await auth.withRefreshToken().generate(user)
    return {
      token,
      user,
    }
  }

  async refresh({request, response, auth}) {
    const {refreshToken} = request.all()
    const token = await auth
    .newRefreshToken()
    .generateForRefreshToken(refreshToken)
    return token
  }

  async me({request, response, auth}) {
    return auth.getUser()
  }
}

module.exports = AuthController
