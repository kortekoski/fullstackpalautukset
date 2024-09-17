const jwt  = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json(savedBlog)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'invalid token'})
  }
  
  const blog = await Blog.findById(request.params.id)
  
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'wrong user, cannot delete resource'})
  }
})
  
blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    if (body.title === undefined || body.url === undefined) {
      response.status(400).json(body)
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        user: user._id,
        url: body.url,
        likes: body.likes === undefined
          ? 0
          : body.likes
      })

      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(updatedBlog)
})

module.exports = blogsRouter