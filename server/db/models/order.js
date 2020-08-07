const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  totalCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  shippingFirstName: {
    type: Sequelize.STRING
  },
  shippingLastName: {
    type: Sequelize.STRING
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  shippingCity: {
    type: Sequelize.STRING
  },
  shippingState: {
    type: Sequelize.STRING
  },
  shippingZipCode: {
    type: Sequelize.STRING
  },
  billingFirstName: {
    type: Sequelize.STRING
  },
  billingLastName: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  billingCity: {
    type: Sequelize.STRING
  },
  billingState: {
    type: Sequelize.STRING
  },
  billingZipCode: {
    type: Sequelize.STRING
  },
  creditCardNumber: {
    type: Sequelize.INTEGER
  }
})

// instance methods
Order.prototype.setTotalCost = () => {}

module.exports = Order
