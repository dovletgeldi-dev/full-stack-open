const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  }, 100000);

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // test("there are 6 blogs", async () => {
  //   const blogs = await helper.blogsInDb();

  //   assert.strictEqual(blogs.length, helper.initialBlogs.length);
  // });

  // test("the unique identifier property of the blog is id", async () => {
  //   const blogsAtStart = await helper.blogsInDb();

  //   const blogToView = blogsAtStart[0];

  //   const test = Object.keys(blogToView);

  //   assert(test.includes("id"));
  // });

  // describe("addition of a blog", () => {
  //   test("a valid blog can be added", async () => {
  //     const newBlog = {
  //       title: "Title of titles",
  //       author: "John Doe",
  //       url: "https://johndoe.com",
  //       likes: 20,
  //     };

  //     await api
  //       .post("/api/blogs")
  //       .send(newBlog)
  //       .expect(201)
  //       .expect("Content-Type", /application\/json/);

  //     const blogsAtEnd = await helper.blogsInDb();
  //     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  //     const titles = blogsAtEnd.map((b) => b.title);
  //     assert(titles.includes("Title of titles"));
  //   });

  //   test("a missing likes key will default to 0 ", async () => {
  //     const newBlog = {
  //       title: "Title of titles",
  //       author: "John Doe",
  //       url: "https://johndoe.com",
  //     };

  //     await api
  //       .post("/api/blogs")
  //       .send(newBlog)
  //       .expect(201)
  //       .expect("Content-Type", /application\/json/);

  //     const blogsAtEnd = await helper.blogsInDb();
  //     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  //     const likes = blogsAtEnd[helper.initialBlogs.length]["likes"];
  //     assert.strictEqual(likes, 0);
  //   });

  //   test("a blog without title and url properties will not be added", async () => {
  //     const newBlog = {
  //       author: "John Doe",
  //       likes: 12,
  //     };

  //     await api.post("/api/blogs").send(newBlog).expect(400);

  //     const blogsAtEnd = await helper.blogsInDb();

  //     console.log(blogsAtEnd);
  //     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  //   });
  // });

  // describe("deletion of a blog", () => {
  //   test("succeeds with status code 204 if id is valid", async () => {
  //     const blogsAtStart = await helper.blogsInDb();
  //     const blogToDelete = blogsAtStart[0];

  //     await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  //     const blogsAtEnd = await helper.blogsInDb();

  //     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

  //     console.log(blogsAtEnd);

  //     const titles = blogsAtEnd.map((b) => b.title);
  //     assert(!titles.includes(blogToDelete.title));
  //   });
  // });

  // describe("update of a blog", () => {
  //   test("succeeds with status code 200 if updated", async () => {
  //     const blogsAtStart = await helper.blogsInDb();
  //     const blogToUpdate = blogsAtStart[0];

  //     console.log(blogsAtStart);

  //     const updatedBlog = {
  //       title: "React patterns",
  //       author: "Michael Chan",
  //       url: "https://reactpatterns.com/",
  //       likes: 10,
  //     };

  //     await api
  //       .put(`/api/blogs/${blogToUpdate.id}/`)
  //       .send(updatedBlog)
  //       .expect(200);

  //     const blogsAtEnd = await helper.blogsInDb();

  //     console.log(blogsAtEnd);

  //     const likes = blogsAtEnd[0]["likes"];
  //     assert.strictEqual(likes, updatedBlog.likes);
  //   });
  // });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root",
      name: "Superuser",
      passwordHash,
    });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username or password is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "su",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes(
        "expected `username` and `password` to be at least 3 characters long"
      )
    );

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
