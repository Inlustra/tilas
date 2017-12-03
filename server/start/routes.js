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

Route.on('/').render('welcome')

Route.post('/api/auth/login', 'UserController.login')
Route.post('/api/auth/register', 'UserController.register')
Route.post('/api/auth/refresh', 'UserController.refresh')
Route.get('/api/auth/me', 'UserController.me').middleware(['auth'])
Route.post('/api/ping', 'TestController.authedHelloWorld').middleware(['auth'])
Route.route('/api/*', async () => {}, ['GET', 'POST', 'OPTIONS', 'PUT', 'HEAD'])
Route.route('*', async () => {}, ['GET'])
