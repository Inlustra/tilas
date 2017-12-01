'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserAlreadyExistsException extends LogicalException {
  constructor(message = 'USER_ALREADY_EXISTS', status = 422, code) {
    super(message, status, code)
  }
}

module.exports = UserAlreadyExistsException
