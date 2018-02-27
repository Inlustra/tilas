export interface AuthConfiguration {
    secret: string
}

export const AuthConfig = 'AUTH_CONFIG'

export function ConfigurationProvider(configuration: AuthConfiguration) {
  return {
    provide: AuthConfig,
    useValue: configuration
  }
}
