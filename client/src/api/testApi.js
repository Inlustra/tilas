
class TestApi {

    constructor(http, authHttp) {
      this.http = http
      this.authHttp = authHttp
    }

    ping(email, password) {
      return this.authHttp
        .get('/api/ping')
        .map(({ response }) => response)
    }
  }

  export default TestApi
