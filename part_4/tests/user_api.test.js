const User = require('../models/user');
const { test, describe, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

describe('New user is not added, if...', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('...The username is not unique.', async () => {
    const newUser = {
      username: 'Mikko',
      name: 'Matti',
      password: 'Katti',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const secondUser = {
      username: 'Mikko',
      name: 'Matti',
      password: 'Katti',
    };

    const response = await api.post('/api/users').send(secondUser);

    assert.strictEqual(response.status, 400);
  });

  test('...The username is not atleast three characters long.', async () => {
    const newUser = {
      username: 'Mi',
      name: 'Matti',
      password: 'Katti',
    };

    const response = await api.post('/api/users').send(newUser);

    assert.strictEqual(response.status, 400);
  });
  test('...The password is not atlesat three characters long.', async () => {
    const newUser = {
      username: 'Mikko',
      name: 'Matti',
      password: 'Ka',
    };

    const response = await api.post('/api/users').send(newUser);

    assert.strictEqual(response.status, 400);
  });
});
