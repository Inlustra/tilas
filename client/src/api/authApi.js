
class AuthApi {

  constructor(http, authHttp) {
    this.http = http
    this.authHttp = authHttp
  }

  login(email, password) {
    return this.authHttp
      .post('/api/auth/login', { email, password })
      .map(({ response }) => response)
  }

  register(name, email, password) {
    return this.authHttp
      .post('/api/auth/register', { name, email, password })
      .map(({ response }) => response)
  }

  me() {
    return this.authHttp.get('/api/auth/me').map(({ response }) => response)
  }
}

export default AuthApi
