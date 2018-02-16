'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')


// USERS
Route.put('/api/users/', 'UserController.update')
Route.get('/api/users/:id', 'UserController.show')
Route.get('/api/users/:id/posts', 'TilsController.listUserPosts')

// AUTH
Route.post('/api/auth/login', 'AuthController.login')
Route.post('/api/auth/register', 'AuthController.register')
Route.post('/api/auth/refresh', 'AuthController.refresh')
Route.get('/api/auth/me', 'AuthController.me').middleware(['auth'])

// HEALTH
Route.get('/api/ping', 'TestController.authedHelloWorld').middleware(['auth'])

// REST
Route.route('/api/*', async () => {}, ['GET', 'POST', 'OPTIONS', 'PUT', 'HEAD'])
Route.route('*', async () => {}, ['GET'])
