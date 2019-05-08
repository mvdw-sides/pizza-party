const supertest = require("supertest");
const app = require("../lib/app");
const db = require("../lib/models/index");
let server;
let request;

const orderBody = require("./fixtures/order.js");

beforeAll(async done => {
  server = app.listen(done);
  request = supertest.agent(server);
});

afterAll(async done => {
  server.close(done);
  db.sequelize.close();
  return Promise.resolve();
});

describe("Order tests", () => {
  // catch the first insert
  // we'll use this to validate the other tests against
  let ingested = 1;

  // list
  test("get orders route GET /orders", async () => {
    const response = await request.get("/orders");
    expect(response.status).toEqual(200);
  });

  // create
  test("post orders route POST /orders", async () => {
    const response = await request.post("/orders").send(orderBody);
    expect(response.status).toEqual(201);
    ingested = response.body.id;
  });

  // retrieve
  test(`get orders route GET /orders/${ingested}`, async () => {
    const response = await request.get(`/orders/${ingested}`);
    expect(response.status).toEqual(200);
    expect(response.body.totalPrice).toEqual(2700);
    expect(response.body.status).toEqual("submitted");
  });

  // update
  test(`put orders route PUT /orders/${ingested}`, async () => {
    const response = await request.put(`/orders/${ingested}`).send({
      products: [{ id: 4, quantity: 6 }, { id: 3, quantity: 2 }]
    });
    expect(response.status).toEqual(200);
  });

  // retrieve after update
  test(`get orders route GET /orders/${ingested}`, async () => {
    const response = await request.get(`/orders/${ingested}`);
    expect(response.status).toEqual(200);
    expect(response.body.totalPrice).toEqual(4700);
    expect(response.body.status).toEqual("submitted");
  });

  // update
  test(`put orders route PUT /orders/${ingested}`, async () => {
    const response = await request.put(`/orders/${ingested}`).send({
      status: "preparing"
    });
    expect(response.status).toEqual(200);
  });

  // retrieve
  test(`get orders route GET /orders/${ingested}`, async () => {
    const response = await request.get(`/orders/${ingested}`);
    expect(response.status).toEqual(200);
    expect(response.body.totalPrice).toEqual(4700);
    expect(response.body.status).toEqual("preparing");
  });

  // delete
  test(`delete orders route DELETE /orders/${ingested}`, async () => {
    const response = await request.delete(`/orders/${ingested}`);
    expect(response.status).toEqual(200);
  });
});
