/* eslint-disable camelcase */
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Family = use('App/Models/Family')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category')

const { randomBytes } = require('crypto')
const { promisify } = require('util')

const FamilyHook = (exports = module.exports = {})

FamilyHook.createCode = async (family) => {
  const random = await promisify(randomBytes)(8)
  const code = random.toString('hex').slice(0, 8).toUpperCase()

  const codeAlreadyExists = await Family.findBy('code', code)

  if (codeAlreadyExists) {
    this.createCode(family)
  }

  family.code = code
}

FamilyHook.createDefaultCategories = async (familyInstance) => {
  const family_id = await familyInstance.id

  const types = {
    revenue: 'revenue',
    expense: 'expense'
  }

  /**
   * revenue
   */
  let revenueCategories = [
    {
      name: 'Casa',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Educação',
      icon: 'book',
      color: '7159c1'
    },
    {
      name: 'Eletrônicos',
      icon: 'computer',
      color: '7159c1'
    },
    {
      name: 'Lazer',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Outros',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Restaurante',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Saúde',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Serviços',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Supermercado',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Transporte',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Vestuário',
      icon: 'home',
      color: '7159c1'
    },
    {
      name: 'Viagem',
      icon: 'home',
      color: '7159c1'
    }
  ]

  revenueCategories = revenueCategories.map((category) => {
    category.type = types.revenue
    return category
  })

  /**
   * expense
   */
  let expenseCategories = [
    {
      name: 'Salário',
      icon: 'money',
      color: '7159c1'
    },
    {
      name: 'Aluguel',
      icon: 'money',
      color: '7159c1'
    }
  ]

  expenseCategories = expenseCategories.map((category) => {
    category.type = types.expense
    return category
  })

  let allCategories = [...revenueCategories, ...expenseCategories]

  allCategories = allCategories.map((category) => {
    category.family_id = family_id
    return category
  })

  await Category.createMany(allCategories)
}
