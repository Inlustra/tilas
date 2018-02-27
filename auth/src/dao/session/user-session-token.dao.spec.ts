import { UserSessionTokenDao } from './user-session-token.dao'
import { Test } from '@nestjs/testing'
import * as mongoose from 'mongoose'

import { DatabaseProvider } from '../../providers/database.provider'
import { Mongoose, Types } from 'mongoose'
import { Mockgoose } from 'mockgoose-fix'
import { ModelAlreadyExistsException } from '../../exceptions/dao.exceptions'
import { UserSessionToken } from './user-session-token.model'
import * as lolex from 'lolex'

describe('UserTokenDao', () => {
  let database: Mongoose
  let userSessionTokenDao: UserSessionTokenDao
  let mockgoose: Mockgoose
  let clock: lolex.NodeClock

  beforeAll(async () => {
    mockgoose = new Mockgoose(mongoose)
    await mockgoose.prepareStorage()
    database = await mongoose.connect('mongodb://example.com/TestingDB')
  })

  afterAll(async () => {
    await database.disconnect()
  })

  beforeEach(async () => {
    mockgoose.helper.reset()
    delete (<any>mongoose.connection).models['userSessionTokens']
    const module = await Test.createTestingModule({
      components: [DatabaseProvider(database), UserSessionTokenDao]
    }).compile()
    userSessionTokenDao = module.get<UserSessionTokenDao>(UserSessionTokenDao)
  })

  beforeEach(() => {
    clock = lolex.install()
  })

  afterEach(() => {
    clock.uninstall()
    clock = null
  })

  describe('findById', () => {
    it('should return a token', async () => {
      const token = await userSessionTokenDao.create('myUser')
      const actual = await userSessionTokenDao.findById(token._id)
      expect(actual).toEqual(token)
    })

    it('should return null given an incorrect id', async () => {
      const actual = await userSessionTokenDao.findById(
        '41224d776a326fb40f000001'
      )
      expect(actual).toBeNull()
    })
  })

  describe('create', () => {
    it('should generate a token of 20 characters', async () => {
      clock.now = 0
      const token = await userSessionTokenDao.create('randomUser')
      expect(token.token.length).toBe(20)
      expect(token.userId).toBe('randomUser')
      expect(token.expires).toEqual(new Date(30 * 24 * 60 * 60 * 1000))
    })
  })
})
