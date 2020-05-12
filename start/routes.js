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
  // TODO: validator
  Route.put('register/:family_code/associate', 'RegisterController.update')

  Route.post('families', 'FamilyController.store').validator('Family')
}).middleware('auth:jwt')

Route.group(() => {
  Route.get('categories', 'CategoryController.index')
  Route.get('categories/:id', 'CategoryController.show')
  // TODO: validator
  Route.post('categories', 'CategoryController.store')
  // TODO: validator
  Route.put('categories/:id', 'CategoryController.update')
  Route.delete('categories/:id', 'CategoryController.destroy')

  Route.get('expenses', 'ExpenseController.index')
  Route.get('expenses/:id', 'ExpenseController.show')
  // TODO: validator
  Route.post('expenses', 'ExpenseController.store')
}).middleware(['auth:jwt', 'family'])
