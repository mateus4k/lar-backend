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

/**
 * Initial
 */
Route.group(() => {
  Route.post('accept_rules', 'AcceptRuleController.store')

  Route.put('register/:family_code/associate', 'RegisterController.update')

  Route.post('families', 'FamilyController.store').validator('Family')
}).middleware('auth:jwt')

/**
 * Private
 */
Route.group(() => {
  Route.get('categories', 'CategoryController.index')
  Route.get('categories/:id', 'CategoryController.show')
  Route.post('categories', 'CategoryController.store').validator(
    'CategoryStore'
  )
  Route.put('categories/:id', 'CategoryController.update').validator(
    'CategoryUpdate'
  )
  Route.delete('categories/:id', 'CategoryController.destroy')

  Route.get('expenses', 'ExpenseController.index')
  Route.get('expenses/:id', 'ExpenseController.show')
  Route.post('expenses', 'ExpenseController.store').validator('ExpenseStore')
  Route.put('expenses/:id', 'ExpenseController.update').validator(
    'ExpenseUpdate'
  )
  Route.delete('expenses/:id', 'ExpenseController.destroy')

  Route.get('revenues', 'RevenueController.index')
  Route.get('revenues/:id', 'RevenueController.show')
  Route.post('revenues', 'RevenueController.store').validator('RevenueStore')
  Route.put('revenues/:id', 'RevenueController.update').validator(
    'RevenueUpdate'
  )
  Route.delete('revenues/:id', 'RevenueController.destroy')

  Route.get('reports', 'ReportController.index')
}).middleware(['auth:jwt', 'family'])
