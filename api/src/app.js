import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import { Products, Product } from "./Controllers";

const app = new Koa();
const router = new Router();

const response = (body, ctx) => {
  if (body.isBoom) {
    ctx.body = body.output.payload;
    ctx.status = body.output.statusCode;
  } else {
    ctx.body = body;
  }
  return ctx;
};

router.get("/products", async (ctx, next) => {
  const products = await Products.receive();
  ctx.body = products;
});

router.get("/products/:id", async (ctx, next) => {
  const product = await Product.receive({ id: ctx.params.id });
  ctx = response(product, ctx);
});

////////////////
/* DATA MODEL */
////////////////

// products                -> productVariations
//    > type                        > productId
//    > name                        > price
//    > description                 > name
//                                  > description
//
//
// orders                   -> orderProducts                    -> orderUpdates (status updates about an order)
//    > addressId                   > productId                         > orderId
//    > totalPrice                  > variationId                       > changes json(), contains a detailed list of the changes
//    > status                      > priceTotal                        > type enum('status'|'order') (if the status is changed or the order)
//    > guid                        > quantity
//
//
//
// addresses
//    > firstName
//    > lastName
//    > city
//    > street
//    > address
//    > zip

///////////////
/* REST FLOW */
///////////////

// 1. [fetch product overview]      -> GET    `/products`                     -> returns `[products]`
// 2. [fetch product specifics]     -> GET    `/products/{id}`                -> returns `{product, [variations]}`
// 3. [place order with products]   -> POST   `/orders`                       -> creates `{order} -> {address}`
// 4. [fetch order information]     -> GET    `/orders/{id|guid}`             -> returns `{order, [products -> {variation}], address}`
// 5. [update order information]    -> PUT    `/orders/{id}`                  -> updates `{order} -> {address}`
// 6. [cancel order]                -> DELETE `/orders{id}`                   -> deletes `{order}`
// 7. [fetch all orders]            -> GET    `/orders`                       -> returns `[orders]`

// `/orders`        : GET, POST
// `/orders/{id}`   : GET, UPDATE, DELETE
// `/products`      : GET
// `/products/{id}` : GET

app.use(router.routes());
app.use(cors());

module.exports = app;
