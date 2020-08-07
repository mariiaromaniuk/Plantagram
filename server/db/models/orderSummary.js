const Sequelize = require('sequelize')
const db = require('../db')

const OrderSummary = db.define('plant_order', {
  plantQuantity: {
    type: Sequelize.INTEGER
  },
  plantSubtotal: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderSummary
