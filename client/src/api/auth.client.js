import client from './client'

function login (email, password) {
  return client.post('/api/auth/login', { email, password })
        .map(({ response }) => response)
}

function register (name, email, password) {
  return client.post('/api/auth/register', { name, email, password })
        .map(({ response }) => response)
}

export default {
  login,
  register
}
