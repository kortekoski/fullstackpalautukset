const bcrypt = require('bcrypt')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')

const api = supertest(app)

describe('adding users to the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('testboi', 10)
        const user = new User({ username: 'testboi', passwordHash})

        await user.save()
    })

    test('adding succeeds with proper user info', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "testgrill",
            name: "mustang",
            password: "superhot"
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('adding fails with no username/password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUserOne = {
            name: "mustang",
            password: "superhot"
        }

        const newUserTwo = {
            username: "testgrill",
            name: "mustang"
        }

        await api
          .post('/api/users')
          .send(newUserOne)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users')
          .send(newUserTwo)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('cannot add user with the same username as an existing user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "testboi",
            name: "kummid",
            password: "sidurpidur"
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

        assert(result.body.error.includes('expected `username` to be unique'))
    })

    after(async () => {
        await mongoose.connection.close()
    })
})