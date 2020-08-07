const User = require('./user')
const Plant = require('./plants')
const Order = require('./order')
const OrderSummary = require('./orderSummary')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// creates through-table 'Order_Summary'
Plant.belongsToMany(Order, {as: 'OrderSummary', through: 'plant_order'})
Order.belongsToMany(Plant, {as: 'OrderSummary', through: 'plant_order'})

User.hasMany(Order)
Order.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Plant,
  OrderSummary
}
