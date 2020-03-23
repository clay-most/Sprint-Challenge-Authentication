//passing: seed before and after each test

const supertest = require("supertest");
const server = require("../index");

test("test good register", async () => {
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "Artemis", password: "Fowl" });
  expect(res.statusCode).toBe(200);
});

test("test duplicate", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "Artemis", password: "Fowl" });
    expect(res.statusCode).toBe(500);
  });

test("test good login", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "Artemis", password: "Fowl" });
  expect(res.statusCode).toBe(200);
});

test("test misspelling", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "Artemis", password: "Foul" });
    expect(res.statusCode).toBe(500);
  });