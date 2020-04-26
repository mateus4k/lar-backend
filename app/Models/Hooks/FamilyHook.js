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
  // eslint-disable-next-line camelcase
  const family_id = await familyInstance.id

  const categories = [
    {
      family_id,
      name: 'Casa',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Educação',
      icon: 'book',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Eletrônicos',
      icon: 'computer',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Lazer',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Outros',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Restaurante',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Saúde',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Serviços',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Supermercado',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Transporte',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Vestuário',
      icon: 'home',
      color: '7159c1'
    },
    {
      family_id,
      name: 'Viagem',
      icon: 'home',
      color: '7159c1'
    }
  ]

  await Category.createMany(categories)
}
