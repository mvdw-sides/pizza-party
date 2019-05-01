import Koa from "koa";
import cors from "@koa/cors";

import { Address } from "./models";

// console.log(db.models.Address);

Address.create({
  firstName: "Matti"
});

const app = new Koa();
app.use(cors);
app.use(ctx => {
  ctx.body = "Hello Koa!";
});

console.log("running");
module.exports = app.listen(process.env.PORT || 7002);
