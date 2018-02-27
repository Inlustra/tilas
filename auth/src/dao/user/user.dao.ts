import { Component, Inject } from '@nestjs/common'
import { Document, Model, Mongoose } from 'mongoose'

import { Database } from '../../providers/database.provider'
import { Role, User } from './user.model'
import * as bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'

@Component()
export class UserDao {
  private readonly schema: Schema = new Schema({
    email: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    password: {
      type: String,
      select: false,
      required: true
    },
    roles: {
      type: [String],
      enum: ['USER', 'ADMIN'],
      default: ['USER']
    }
  })

  private schemaPreSave = function(next) {
    const user = this
    const SALT_WORK_FACTOR = 10
    if (!user.isModified('password')) return next()
    bcrypt
      .genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => (user.password = hash))
      .then(() => next())
      .catch(error => next(error))
  }

  private model: Model<User & Document> = this.database.model(
    'user',
    this.schema
  )

  constructor(@Inject(Database) private database: Mongoose) {
    this.initSchema()
  }

  initSchema() {
    this.schema.pre('save', this.schemaPreSave)
  }

  async findById(id: string): Promise<User> {
    return (await this.model
      .findById(id)
      .lean()
      .exec()) as User
  }

  async findByEmail(email: string): Promise<User> {
    return (await this.model
      .findOne({
        email
      })
      .lean()
      .exec()) as User
  }

  async create(user: User): Promise<User> {
    const doc = await this.model.create(user)
    return await this.findById(doc._id)
  }

  async isValid(email: string, password: string): Promise<boolean> {
    const user: User = (await this.model
      .findOne({
        email
      })
      .select('+password')
      .lean()
      .exec()) as User
    return user ? await bcrypt.compare(password, user.password) : false
  }
}
