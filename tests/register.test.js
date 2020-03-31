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

// test("get all jokes", async () => {
//   const res = await supertest(server)
//     .post("/api/auth/login")
//     .send({ username: "Artemis", password: "Fowl" });

//   const res2 = await supertest(server)
//     .get("/api/auth/jokes")
//     .send({ authorization: res.body.token });

//   console.log(res.body.token);
//   expect(res2.statusCode).toBe(200);
//   expect(res2.type).toBe("application/json");
// });
