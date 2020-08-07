const router = require('express').Router()
const Plants = require('../db/models/plants')

//find all plants
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plants.findAll()
    res.json(plants)
  } catch (err) {
    next(err)
  }
})

//find single plant by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const plant = await Plants.findByPk(id)
    if (plant) {
      res.json(plant)
    } else {
      res.send('Sorry This Item Is No Longer Available').sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//add a new plant to the database
router.post('/', async (req, res, next) => {
  try {
    const newPlant = await Plants.create(req.body)
    res.json(newPlant)
  } catch (err) {
    next(err)
  }
})

// update the plant info
router.put('/:id', async (req, res, next) => {
  try {
    const plantId = req.params.id
    const plant = await Plants.findOne({
      where: {id: plantId}
    })
    const updatedPlant = await plant.update(req.body)

    console.log('updated plant: ', updatedPlant)
    res.json(updatedPlant)
  } catch (err) {
    next(err)
  }
})

//delete plant from database
router.delete('/:id', async (req, res, next) => {
  try {
    await Plants.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
