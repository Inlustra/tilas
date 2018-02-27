import { Test } from '@nestjs/testing'
import * as mongoose from 'mongoose'

import { DatabaseProvider } from '../../providers/database.provider'
import { UserDao } from './user.dao'
import { User } from './user.model'
import { Mongoose, Types } from 'mongoose'
import { Mockgoose } from 'mockgoose-fix'
import { ModelAlreadyExistsException } from '../../exceptions/dao.exceptions'

describe('UserDao', () => {
  let database: Mongoose
  let userDao: UserDao
  let mockgoose: Mockgoose

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
    delete (<any>mongoose.connection).models['user']
    const module = await Test.createTestingModule({
      components: [DatabaseProvider(database), UserDao]
    }).compile()
    userDao = module.get<UserDao>(UserDao)
  })

  describe('findById', () => {
    it('should return the user given the correct id', async () => {
      const created = await userDao.create(createUser())
      const doc = await userDao.findById(created._id)
      expect(doc.email).toEqual(created.email)
    })

    it('should not contain password when selecting user', async () => {
      const created = await userDao.create(createUser())
      const doc = await userDao.findById(created._id)
      expect(doc).not.toHaveProperty('password')
      expect(doc._id).toEqual(created._id)
    })

    it('should return null given an incorrect id', async () => {
      const created = await userDao.create(createUser())
      const doc = await userDao.findById('41224d776a326fb40f000001')
      expect(doc).toBeNull()
    })
  })

  describe('findByEmail', () => {
    it('should return the user given the correct email', async () => {
      const created = await userDao.create(createUser())
      const doc = await userDao.findByEmail(created.email)
      expect(doc._id).toEqual(created._id)
    })

    it('should return null given an incorrect email', async () => {
      const created = await userDao.create(createUser())
      const doc = await userDao.findByEmail('wrong')
      expect(doc).toBeNull()
    })
  })

  describe('create', () => {
    it('should correctly create a user', async () => {
      const user = createUser()
      const actual = await userDao.create(user)
      expect(actual).toHaveProperty('_id')
      expect(actual).not.toHaveProperty('password')
      expect(actual.email).toEqual(user.email)
      expect(actual.roles).toEqual(['USER'])
    })

    it('should throw an error when a user is created with the same email', async () => {
      const user = createUser()
      await userDao.create(user)
      await expect(userDao.create(user)).rejects.toThrow()
    })
  })

  describe('comparePassword', () => {
    it('should return true when the passwords match', async () => {
      const user = await userDao.create(createUser())
      const actual = await userDao.isValid(user.email, 'testPass')
      expect(actual).toBe(true)
    })

    it(`should return false when the passwords don't match`, async () => {
      const user = await userDao.create(createUser())
      const actual = await userDao.isValid(user.email, 'wrongPass')
      expect(actual).toBe(false)
    })

    it(`should return false when the user is not found`, async () => {
      const user = await userDao.create(createUser())
      const actual = await userDao.isValid('invalid', 'testPass')
      expect(actual).toBe(false)
    })
  })

  function createUser(password = true): User {
    return {
      email: 'test' + new Date() + '@email.com',
      password: password ? 'testPass' : undefined
    }
  }
})
