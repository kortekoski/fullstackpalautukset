const listHelper = require('../utils/list_helper')
const { test, describe } = require('node:test')
const assert = require('node:assert')

const test1 = {
  title: "testiteksti",
  author: "Testi Ukko",
  url: "testi.fi",
  likes: 100
}

const test2 = {
    title: "toinen teksti",
    author: "Testi Akka",
    url: "testi.fi",
    likes: 200
}

const test3 = {
    title: "asdsd",
    author: "Testi Akka",
    url: "jippii.fi",
    likes: 420
}

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('empty list returns zero', () => {
        const emptylist = []

        const result = listHelper.totalLikes(emptylist)
        assert.strictEqual(result, 0)
    })

    test('sum of one blogs likes equals to the blogs likes', () => {
        const result = listHelper.totalLikes([test1])
    
        assert.strictEqual(result, 100)
    })
    
    test('sum calculation works for multiple blogs', () => {
        const result = listHelper.totalLikes([test1, test2])
    
        assert.strictEqual(result, 300)
    })
})

test('most likes leads to being the favorite', () => {
    const result = listHelper.favoriteBlog([test1, test2])

    assert.strictEqual(result, test2)
})

test('correctly returns blogger with most texts', () => {
    const result = listHelper.mostBlogs([test1, test2, test3])
    const expected = {
        author: "Testi Akka",
        blogs: 2
    }

    assert.deepStrictEqual(result, expected)
})

test('correctly return blogger with most likes', () => {
    const result = listHelper.mostLikes([test1, test2, test3])
    const expected = {
        author: "Testi Akka",
        likes: 620
    }

    assert.deepStrictEqual(result, expected)
})