import { Module, DynamicModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { Mongoose } from 'mongoose'
import { ConfigurationProvider } from './providers/configuration.provider';
import { DatabaseProvider } from './providers/database.provider';

@Module({
  controllers: [AppController],
  components: []
})
export class ApplicationModule {
  static forRoot(database: Mongoose, config: any): DynamicModule {
    return {
      module: ApplicationModule,
      imports: [],
      components: [
        DatabaseProvider(database), ConfigurationProvider(config)
      ]
    }
  }
}
