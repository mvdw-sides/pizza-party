import Koa from "koa";

// import { Address } from "./models";

// console.log(db.models.Address);

// Address.create({
//   firstName: "Matti"
// });

const app = new Koa();
app.use(ctx => {
  ctx.status = 200;
  ctx.body = { hello: "world" };
});

if (process.env.NODE_ENV === "test") {
  module.exports = app.callback(process.env.PORT || 7004);
} else {
  app.listen(7002);
}
