import { load } from '@inlustra/env-args'

const config = load(
  {
    port: 7001,
    secret: 'dACrEgnLFTNWJz5tsLDskjEukicsVxYDEUdAVOMfOmuArVXmgN',
    databaseConnection: undefined
  },
  {
    envPrefix: 'AUTH_'
  }
)

export default config
