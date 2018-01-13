'use strict'

const User = use('App/Models/User')
const UserAlreadyExistsException = use(
  'App/Exceptions/UserAlreadyExistsException',
)

class UserController {
  async register({ request, auth }) {
    const { email, password, name } = request.all()
    const userAlreadyExists = await User.query()
      .where('email', email)
      .getCount()

    console.log(userAlreadyExists);
    if (userAlreadyExists) {
      throw new UserAlreadyExistsException()
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    const token = await auth.withRefreshToken().generate(user)

    return { user, token }
  }

  async login({ request, response, auth }) {
    const email = request.input('email')
    const password = request.input('password')
    await auth.attempt(email, password)
    const user = await User.query()
      .where('email', email)
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
    const user = await auth.getUser()
    return user
  }
}

module.exports = UserController
