const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// add an order to the database
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create()
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// get the current order
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// delete the current order
router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {id: req.params.orderId}
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })
    await order.update(req.body)

    const updatedOrder = await Order.findOne({
      where: {id: req.params.orderId}
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
