import { NestFactory } from '@nestjs/core'
import * as mongoose from 'mongoose'

import { ApplicationModule } from './app.module'
import config from './config'

async function bootstrap() {
  const database = await mongoose.connect(config.databaseConnection)
  const app = await NestFactory.create(
    ApplicationModule.forRoot(database, config)
  )
  await app.listen(config.port)
}

bootstrap()
