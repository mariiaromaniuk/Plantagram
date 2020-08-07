const router = require('express').Router()
const {OrderSummary, Order, Plant} = require('../db/models')
module.exports = router

// get all of the plants of a specific order
router.get('/:orderId/plants', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId},
      include: [{model: Plant, as: 'OrderSummary'}]
    })
    res.json(order.OrderSummary)
  } catch (error) {
    next(error)
  }
})

// add a specific plant to a specific order, and update its quantity and subtotal
router.post('/:orderId/add/:plantId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })
    const plantProduct = await Plant.findOne({
      where: {id: req.params.plantId}
    })

    await plantProduct.addOrderSummary(order)
    await order.addOrderSummary(plantProduct)

    const plant = await OrderSummary.findOne({
      where: {
        plantId: req.params.plantId,
        orderId: req.params.orderId
      }
    })

    await plant.update({
      plantQuantity: plant.plantQuantity + parseInt(req.body.quantityOrdered)
    })
    await plant.update({
      plantSubtotal: plantProduct.price * plant.plantQuantity
    })

    const updatedOrder = await Order.findOne({
      where: {id: req.params.orderId},
      include: [{model: Plant, as: 'OrderSummary'}]
    })

    res.json(updatedOrder.OrderSummary)
  } catch (error) {
    next(error)
  }
})

// remove a specific plant associated with an order
router.delete('/:orderId/remove/:plantId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })
    const plant = await Plant.findOne({
      where: {id: req.params.plantId}
    })

    await order.removeOrderSummary(plant)
    await plant.removeOrderSummary(order)

    const updatedOrder = await Order.findOne({
      where: {id: req.params.orderId},
      include: [{model: Plant, as: 'OrderSummary'}]
    })
    res.json(updatedOrder.OrderSummary)
  } catch (error) {
    next(error)
  }
})

// edit specific plants associated with an order
router.put('/:orderId/edit/:plantId/', async (req, res, next) => {
  try {
    const plantProduct = await Plant.findOne({
      where: {id: req.params.plantId}
    })
    const plant = await OrderSummary.findOne({
      where: {
        orderId: req.params.orderId,
        plantId: req.params.plantId
      }
    })

    await plant.update({
      plantQuantity: req.body.plantQuantity
    })
    await plant.update({
      plantSubtotal: plantProduct.price * plant.plantQuantity
    })

    const updatedOrder = await Order.findOne({
      where: {id: req.params.orderId},
      include: [{model: Plant, as: 'OrderSummary'}]
    })
    res.json(updatedOrder.OrderSummary)
  } catch (error) {
    next(error)
  }
})
