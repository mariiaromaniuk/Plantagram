/* global describe beforeEach it */
// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const User = db.model('user')

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/users/', () => {
//     const testUser = [{
//       email: 'jenniferB@email.com',
//       firstName: 'Jennifer',
//       lastName: 'Brown',
//       isAdmin: false
//     }]

//     beforeEach(() => {
//       return User.create(testUser)
//     })

//     it('GET /api/users', () => {
//       return request(app)
//         .get('/api/users')
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an('array')
//           expect(res.body[0].email).to.be.equal('jenniferB@email.com')
//         })
//       // to.be.an('array')
//       //     expect(res.body[0].email).to.be.equal(testEmail)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/:id', () => {
    const userEmail = 'jasmineB@email.com'
    const userFirst = 'Jasmine'
    const userLast = 'Brown'

    beforeEach(() => {
      return User.create({
        email: userEmail,
        firstName: userFirst,
        lastName: userLast,
        isAdmin: false
      })
    })

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(userEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
