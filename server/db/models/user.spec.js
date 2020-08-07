/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let jennifer

      beforeEach(async () => {
        jennifer = await User.create({
          email: 'jenniferB@email.com',
          firstName: 'Jennifer',
          lastName: 'Brown',
          password: '1234'
        })
      })

      it('returns true if the password is correct', () => {
        expect(jennifer.correctPassword('1234')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(jennifer.correctPassword('4567')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
