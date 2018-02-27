import { Component, Inject } from '@nestjs/common'
import { Document, Model, Mongoose, Schema } from 'mongoose'
import { randomBytes } from 'crypto'

import { Database } from '../../providers/database.provider'
import { UserSessionToken } from './user-session-token.model'

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000

@Component()
export class UserSessionTokenDao {
  private readonly schema = new Schema({
    userId: {
      type: String,
      index: true,
      required: true
    },
    token: {
      type: String,
      required: true,
      default: () => randomBytes(10).toString('hex')
    },
    expires: {
      type: Date,
      default: () => new Date(+new Date() + THIRTY_DAYS)
    }
  })

  private model: Model<UserSessionToken & Document> = this.database.model(
    'userSessionTokens',
    this.schema
  )

  constructor(@Inject(Database) private database: Mongoose) {}

  async findById(id: String): Promise<UserSessionToken> {
    const doc = (await this.model
      .findById(id)
      .lean()
      .exec()) as UserSessionToken
    return doc
  }

  async create(userId: string): Promise<UserSessionToken> {
    const doc = await this.model.create({
      userId
    })
    return await this.findById(doc._id)
  }

  async isValid(email: string, token: string): Promise<boolean> {
    const userToken: UserSessionToken = (await this.model
      .findOneAndRemove({
        email,
        token
      })
      .lean()
      .exec()) as UserSessionToken
    return !!userToken
  }
}
