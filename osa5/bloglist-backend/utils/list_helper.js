const _ = require('lodash')

const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }
  
  module.exports = {
    dummy
  }

  const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    const likes = blogs.map(blog => blog.likes)

    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (biggest, item) => {
        return biggest > item
          ? biggest
          : item
    }

    const biggestLikes = blogs.map(blog => blog.likes).reduce(reducer, 0)
    const favorites = blogs.filter(blog => blog.likes === biggestLikes)

    return favorites[0]
}

const mostBlogs = (blogs) => {
    const returnAuthor = (blog) => (blog.author)
    const records = _.countBy(blogs, returnAuthor)
    const sorted = Object.entries(records).sort((a, b) => b[1] - a[1])
    const returnedObject = {
        author: sorted[0][0],
        blogs: sorted[0][1]
    }
    return returnedObject
}

const mostLikes = (blogs) => {
    const returnAuthor = (blog) => (blog.author)
    const returnLikes = (blog) => (blog.likes)
    const records = _.groupBy(blogs, returnAuthor)
    const keys = Object.keys(records)

    const likefy = (k) => {
        const authorblogs = records[k]
        const author = k
        const likes = _.sumBy(authorblogs, returnLikes)

        return({author: author, likes: likes})
    }

    const authorslikes = keys.map(key => likefy(key))
    
    const comparelikes = (a, b) => {
        return a.likes - b.likes
    }

    return authorslikes.sort(comparelikes).pop()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}