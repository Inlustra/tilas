'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserExistsException extends LogicalException {
  constructor(
    message = "User Already Exists",
    status = 422,
    code) {
    super(message, status, code)
  }
}

module.exports = UserExistsException
