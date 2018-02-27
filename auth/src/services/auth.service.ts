import { UserDao } from '../dao/user/user.dao'
import { User } from '../dao/user/user.model'
import { UserSessionTokenDao } from '../dao/session/user-session-token.dao'
import { Component, Inject } from '@nestjs/common'

import {
  AuthConfig,
  AuthConfiguration
} from '../providers/configuration.provider'

@Component()
export class AuthService {
  constructor(
    private userDao: UserDao,
    private userSessionTokenDao: UserSessionTokenDao
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    return await this.userDao.isValid(email, password)
  }

  async loginWithRememberMeToken(
    email: string,
    rememberMeToken: string
  ): Promise<boolean> {
    return await this.userSessionTokenDao.isValid(email, rememberMeToken)
  }

  async register(email: string): Promise<User> {
    return await this.userDao.create({
      email
    })
  }

  createRefreshToken(email: string) {
    return await this.userSessionTokenDao.create(email)
  }
}
