const supertest = require("supertest");
const app = require("../lib/app");
const db = require("../lib/models/index");
let server;
let request;

beforeAll(async done => {
  server = app.listen(done);
  request = supertest.agent(server);
});

afterAll(async done => {
  server.close(done);
  db.sequelize.close();
  return Promise.resolve();
});

describe("basic route tests", () => {
  test("get home route GET /", async () => {
    const response = await request.get("/products");
    expect(response.status).toEqual(200);
  });

  test("get home route GET /", async () => {
    const response = await request.get("/products");
    expect(response.status).toEqual(200);
  });
});
