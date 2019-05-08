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

describe("Get Products", () => {
  test("get product route GET /products", async () => {
    const response = await request.get("/products");
    expect(response.status).toEqual(200);

    // check if we receive the array structure
    expect(response.body.length).toEqual(3);

    // check if the order and structure of the underlying elements are right
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].name).toEqual("Pizza Roasted Veggi");
  });

  test("get specific product /", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toEqual(200);

    // check if it's the right product
    expect(response.body.id).toEqual(1);

    // check if it has the variations
    expect(response.body.ProductVariations.length).toEqual(3);
    expect(response.body.ProductVariations[0].name).toEqual("Small");
    expect(response.body.ProductVariations[0].id).toEqual(1);
    expect(response.body.ProductVariations[0].price).toEqual(500);
  });
});
