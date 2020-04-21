'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Auth
 */
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('register', 'RegisterController.store').validator('Register')
Route.post('forgot', 'ForgotPasswordController.store').validator('Forgot')
Route.post('reset', 'ResetPasswordController.store').validator('Reset')

Route.group(() => {
  Route.post('accept_rules', 'AcceptRuleController.store')

  Route.post('families', 'FamilyController.store').validator('Family')
}).middleware('auth:jwt')
