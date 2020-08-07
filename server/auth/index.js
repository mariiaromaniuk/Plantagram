const router = require('express').Router()
const {User, Order, Plant} = require('../db/models/index')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.session.userId = user.dataValues.id
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const cart = await Order.create()
    const user = await User.create({...req.body, cartId: cart.id})
    cart.setUser(user)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

// router.post('/logout', (req, res) => {
//   req.logout()
//   req.session.destroy()
//   res.redirect('/')
// })

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy(err => {
    if (err) return next(err)
    res.status(204).end()
  })
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  const user = await User.findOne({
    where: {id: req.user.id},
    include: {
      model: Order,
      include: {
        model: Plant,
        as: 'OrderSummary'
      }
    }
  })
  res.json(user)
})

router.use('/google', require('./google'))
