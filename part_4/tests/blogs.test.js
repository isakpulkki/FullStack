const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('Dummy returns one.', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Total likes...', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Kissakirja',
      author: 'Dani Huusanen',
      url: 'www.kissakirja.fi',
      likes: 5,
      __v: 0
    }
  ]

  const listWithTwoBlogs = [
    {
      _id: '1',
      title: 'Kissakirja',
      author: 'Dani Huusanen',
      url: 'www.kissakirja.fi',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Koirakirja',
      author: 'Oskari Puusanen',
      url: 'www.koirakirja.fi',
      likes: 8,
      __v: 0
    }
  ]

  test('...When list is empty.', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('...When list has only one blog.', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('...When list has multiple blogs.', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    assert.strictEqual(result, 13)
  })
})

describe('Favorite blog...', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Kissakirja',
      author: 'Dani Huusanen',
      url: 'www.kissakirja.fi',
      likes: 5,
      __v: 0
    }
  ]

  const listWithTwoBlogs = [
    {
      _id: '1',
      title: 'Kissakirja',
      author: 'Dani Huusanen',
      url: 'www.kissakirja.fi',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Koirakirja',
      author: 'Oskari Puusanen',
      url: 'www.koirakirja.fi',
      likes: 8,
      __v: 0
    }
  ]

  test('...When list is empty.', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result.likes, 0)
  })

  test('...When list has only one blog.', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result.likes, 5)
  })

  test('...When list has multiple blogs.', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    assert.strictEqual(result.likes, 8)
  })
})