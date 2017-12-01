'use strict'

class TestController {
  authedHelloWorld({ request, auth }) {
    return { message: `Hello ${auth.user.name}` }
  }
}

module.exports = TestController
