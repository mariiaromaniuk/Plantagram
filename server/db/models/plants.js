const Sequelize = require('sequelize')
const db = require('../db')

const Plants = db.define('plants', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
    // should the product be unique ?
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'Brings Life into Your Home.'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.unsplash.com/photo-1517204452548-5f07ce910c9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60' //customize
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  livingCondition: {
    type: Sequelize.STRING,
    validate: {
      //must be one of the following
      isIn: [
        ['indoor', 'outdoor', 'shade', 'sun', 'low light', 'Just Add Water']
      ]
    },
    defaultValue: 'Just Add Water'
  },
  season: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Spring', 'Summer', 'Fall', 'This plant is happy all year long']]
    },
    defaultValue: 'This plant is happy all year long'
  }
})

module.exports = Plants
