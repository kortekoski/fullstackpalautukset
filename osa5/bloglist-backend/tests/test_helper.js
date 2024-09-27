const { forEach } = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
    {
      title: 'Manifesti',
      author: 'Hullu Ukko',
      url: 'hullu.fi',
      likes: 88
    },
    {
      title: 'Paras mutakakku',
      author: 'Mummo',
      url: 'mummo.fi',
      likes: 10000
    },
    {
      title: 'Levyarvostelu',
      author: 'Nörö',
      url: 'rumba.fi',
      likes: 0
    }
]

const initialUsers = [
  {
    username: "aaa",
    passwordHash: "pww",
    name: "bbb"
  },
  {
    username: "zzz",
    passwordHash: "pww",
    name: "xxx"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getToken = async () => {
  const user = await User.findOne()

  const userForToken = {
    username: user.username,
    id: user._id
  }
    
  const token = jwt.sign(userForToken, process.env.SECRET)
  return 'Bearer ' + token
}

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb, getToken
}