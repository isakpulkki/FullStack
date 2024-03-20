const { test, describe, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Kissakirja',
    author: 'Dani Huusanen',
    url: 'www.kissakirja.fi',
    likes: 3,
  },
  {
    title: 'Koirakirja',
    author: 'Oskari Puusanen',
    url: 'www.koirakirja.fi',
    likes: 1,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('Blogs are returned as JSON.', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Two blogs are returned.', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test('Blogs have id -field.', async () => {
  const response = await api.get('/api/blogs');
  assert(response.body[0].id);
});
describe('When a blog is added...', async () => {
  
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('Secret', 10);
  await new User({ username: 'Root', passwordHash }).save();
  const loginDetails = { username: 'Root', password: 'Secret' };
  const loginResponse = await api.post('/login').send(loginDetails).expect(200);
  const bearedToken = 'Bearer ' + loginResponse.body.token;

  test('...Length of blogs has risen by one.', async () => {
    const newBlog = {
      title: 'Lehmäkirja',
      author: 'Toni Kuusanen',
      url: 'www.lehmäkirja.fi',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: bearedToken })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, initialBlogs.length + 1);
  });

  test('...Likes are zero if not set at all.', async () => {
    const blogWithoutLikes = {
      title: 'Lehmäkirja',
      author: 'Toni Kuusanen',
      url: 'www.lehmäkirja.fi',
    };
    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .set({ Authorization: bearedToken })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const response = await api.get('/api/blogs');
    const blog = response.body.find(
      (blog) => blog.title == blogWithoutLikes.title
    );
    assert.strictEqual(blog.likes, 0);
  });

  test('...Bad request if title or URL is not set.', async () => {
    const blogWithoutURL = {
      title: 'Lehmäkirja',
      author: 'Toni Kuusanen',
    };
    const response = await api
      .post('/api/blogs')
      .set({ Authorization: bearedToken })
      .send(blogWithoutURL)
      .expect(400);
    assert.strictEqual(response.status, 400);
  });
  

  test('...Blog can be removed by ID.', async () => {
    const response = await api.get('/api/blogs');
    const blogToBeDeleted = {
      title: 'Lehmäkirja',
      author: 'Toni Kuusanen',
      url: 'www.lehmäkirja.fi',
    };
    const blogResponse = await api
      .post('/api/blogs')
      .send(blogToBeDeleted)
      .set({ Authorization: bearedToken })
      .expect(201)
      .expect('Content-Type', /application\/json/);
    await api
      .delete('/api/blogs/' + blogResponse.body.id)
      .set({ Authorization: bearedToken })
      .expect(204);
    const secondResponse = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, secondResponse.body.length);
  });

  
});
  test('Blog can be edited by ID.', async () => {
    const response = await api.get('/api/blogs');
    const toBeEdited = response.body[0];
    const updatedBlog = {
      title: toBeEdited.title,
      author: toBeEdited.author,
      url: toBeEdited.url,
      likes: toBeEdited.likes + 1,
    };
    await api
      .put('/api/blogs/' + toBeEdited.id)
      .send(updatedBlog)
      .expect(200);
    const secondResponse = await api.get('/api/blogs');
    const blog = secondResponse.body.find((blog) => blog.id == toBeEdited.id);
    assert.strictEqual(blog.likes, toBeEdited.likes + 1);
  });

test('Bad request when adding blog without token.', async () => {
  const newBlog = {
    title: 'Lehmäkirja',
    author: 'Toni Kuusanen',
    url: 'www.lehmäkirja.fi',
  };
  const response = await api
    .post('/api/blogs')
    .send(newBlog);
    
  assert.strictEqual(response.status, 401);
});


after(async () => {
  await mongoose.connection.close();
});
