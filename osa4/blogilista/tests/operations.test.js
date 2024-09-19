const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const { test, describe, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

describe('verifying blogs in database', () => {

  before(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('three JSON blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.match(response.header['content-type'], /json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('adding new blogs', () => {
  beforeEach(async () => {
    await Promise.all([
      User.deleteMany({}),
      Blog.deleteMany({})
    ])
  
    await Promise.all([
      User.insertMany(helper.initialUsers),
      Blog.insertMany(helper.initialBlogs)
    ])
    
    token = await helper.getToken()
  })

  test('blog is added with token', async () => {
    const newBlog = {
      "title": "atesti",
      "author": "b",
      "url": "c",
      "likes": 1
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const currentBlogs = await helper.blogsInDb()

    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length + 1)
    assert.ok(currentBlogs.map(blog => blog.title).includes('atesti'))
  
  })

  test('blog cannot be added without token', async () => {
    const newBlog = {
      "title": "atesti",
      "author": "b",
      "url": "c",
      "likes": 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('id field is defined correctly', async () => {
    const currentBlogs = await helper.blogsInDb()
    assert.ok(currentBlogs[0].id)
  })
  
  test('empty likes field results in zero likes', async () => {
    const newBlog = {
      "title": "atesti",
      "author": "b",
      "url": "c"
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: token})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const endingBlogs = await helper.blogsInDb()
    const addedBlog = endingBlogs.pop()
    assert.strictEqual(addedBlog.likes, 0)
  })
  
  test('no title or url results in status 400', async () => {
    const noTitleBlog = {
      "author": "lammas",
      "url": "lammas.fi",
      "likes": 1
    }
  
    const noUrlBlog = {
      "title": "Kela Gold",
      "author": "rotta",
      "likes": 1
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: token})
      .send(noTitleBlog)
      .expect(400)
    
    await api
      .post('/api/blogs')
      .set({ Authorization: token})
      .send(noUrlBlog)
      .expect(400)
  })
})

describe('removing blogs', () => {
  test('blog is removed with the correct user', async () => {
    const startingBlogs = await helper.blogsInDb()

    const newBlog = {
      title: "atesti",
      author: "b",
      url: "c",
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: token})
      .send(newBlog)
    
    const blogFromDb = await Blog.findOne().sort({ _id: -1 })
    const removedId = blogFromDb._id
  
    await api
      .delete(`/api/blogs/${removedId}`)
      .set({ Authorization: token})
      .expect(204)
    
    const endingBlogs = await helper.blogsInDb()
    assert.strictEqual(endingBlogs.length, startingBlogs.length)
    assert.ok(!endingBlogs.map(blog => blog.title).includes("atesti"))
  })
})

describe('editing blogs', () => {
  test('likes update as expected', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToUpdate = startingBlogs[0]
    const updateId = startingBlogs[0].id
    const likesAtStart = startingBlogs[0].likes
    const likesAtEnd = likesAtStart + 50

    const updatedBlog = {
      "title": blogToUpdate.title,
      "author": blogToUpdate.author,
      "url": blogToUpdate.url,
      "likes": likesAtEnd
    }

    await api
      .put(`/api/blogs/${updateId}`)
      .send(updatedBlog)
    
    const endingBlogs = await helper.blogsInDb()
    assert.strictEqual(endingBlogs[0].likes, likesAtEnd)
  })

  test('title and author update as expected', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToUpdate = startingBlogs[0]
    const updateId = startingBlogs[0].id

    const updatedBlog = {
      "title": "Kommunistinen manifesti",
      "author": "Karl Marx",
      "url": blogToUpdate.url,
      "likes": blogToUpdate.likes
    }

    await api
      .put(`/api/blogs/${updateId}`)
      .send(updatedBlog)
    
    const endingBlogs = await helper.blogsInDb()
    assert.strictEqual(endingBlogs[0].title, "Kommunistinen manifesti")
    assert.strictEqual(endingBlogs[0].author, "Karl Marx")
  })
})

after(async () => {
  await mongoose.connection.close()
})