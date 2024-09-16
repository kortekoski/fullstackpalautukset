const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}