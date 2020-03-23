const supertest = require("supertest");
const db = require("../database/dbConfig");
const server = require("../index");

test("Restriction failure", async () => {
  const res = await supertest(server).get("/jokes");
  expect(res.statusCode).toBe(404);
});

test("get all jokes", async () => {
  const res = await supertest(server)
    .post("/auth/register")
    .send({ username: "hey", password: "you" })

  const res2 = await supertest(server)
    .get("/jokes")
    console.log(res.body)
    .send({ authorization: res.body.token });
  expect(res2.statusCode).toBe(200);
  expect(res2.type).toBe("application/json");
});
