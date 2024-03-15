const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Kissakirja",
    author: "Dani Huusanen",
    url: "www.kissakirja.fi",
    likes: 3,
  },
  {
    title: "Koirakirja",
    author: "Oskari Puusanen",
    url: "www.koirakirja.fi",
    likes: 1,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("Blogs are returned as JSON.", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Two blogs are returned.", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("Blogs have id -field.", async () => {
  const response = await api.get("/api/blogs");
  assert(response.body[0].id);
});
describe("When a blog is added...", () => {
  test("...Length of blogs has risen by one.", async () => {
    const newBlog = {
      title: "Lehmäkirja",
      author: "Toni Kuusanen",
      url: "www.lehmäkirja.fi",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length + 1);
  });

  test("...Likes are zero if not set at all.", async () => {
    const blogWithoutLikes = {
      title: "Lehmäkirja",
      author: "Toni Kuusanen",
      url: "www.lehmäkirja.fi",
    };
    await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");
    const blog = response.body.find(
      (blog) => blog.title == blogWithoutLikes.title
    );
    assert.strictEqual(blog.likes, 0);
  });

  test("...Bad request if title or URL is not set.", async () => {
    const blogWithoutURL = {
      title: "Lehmäkirja",
      author: "Toni Kuusanen",
    };
    const response = await api
      .post("/api/blogs")
      .send(blogWithoutURL)
      .expect(400);
    assert.strictEqual(response.status, 400);
  });
});
after(async () => {
  await mongoose.connection.close();
});
