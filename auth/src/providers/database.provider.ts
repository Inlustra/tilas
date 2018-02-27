import { Mongoose } from 'mongoose'

export const Database = 'AUTH_DB'

export function DatabaseProvider(database: Mongoose) {
  return {
    provide: Database,
    useValue: database
  }
}
