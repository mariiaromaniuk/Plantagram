const {expect} = require('chai')
const db = require('../index')
const Plant = db.model('plants')

describe('Plant model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('sets correct values at product creation', () => {
    let plant

    beforeEach(async () => {
      try {
        plant = await Plant.create({
          name: 'Cactus',
          price: 1000,
          description: 'indoor dry plant',
          stock: 10,
          imgUrl:
            'https://images.unsplash.com/photo-1517204452548-5f07ce910c9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
          livingConditions: 'shade',
          season: 'Summer'
        })
      } catch (error) {
        console.error(
          'Uh Oh! An error has happening while creating a plant',
          error
        )
      }
    })

    it('sets name', () => {
      expect(plant.name).to.be.equal('Cactus')
    })

    it('sets price', () => {
      expect(plant.price).to.be.equal(1000)
    })

    // it('sets the imgUrl to default value if no image is provided', () => {
    //   expect(plant.imgUrl).to.be.equal('https://images.unsplash.com/photo-1517204452548-5f07ce910c9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60')
    // })

    it('sets the stock', () => {
      expect(typeof plant.stock).to.be.equal('number')
      expect(plant.stock).to.be.equal(10)
    })
  }) // end describe('sets correct values at product creation')
}) // end describe('Product model')
// there is no need to test validators in sequelize

// create a test to see if price is pennies

// create a test to see if stock decrements when one is purchased

// should I turn the string into a number for stock

//changing this to number
// // create a function to alert customer when stock
// stock: {
//   type: Sequelize.STRING,
//   defaultValue: true //lets customer know that it is available.
// },
