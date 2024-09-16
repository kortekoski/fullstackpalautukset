const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
    if (request.body.username === undefined || request.body.password === undefined) {
        response.status(400).json({
            error: "Username or password missing"
        })
    }

    const { username, password, name } = request.body

    if (username.length < 3) {
        response.status(400).json({
            error: "Username must be at least 3 characters long"
        })
    }

    if (password.length < 3) {
        response.status(400).json({
            error: "Password must be at least 3 characters long"
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash,
        name
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter