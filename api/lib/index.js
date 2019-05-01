"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(db.models.Address);
_models.Address.create({
  firstName: "Matti"
});

const app = new _koa.default();
app.use(_cors.default);
app.use(ctx => {
  ctx.body = "Hello Koa!";
});
console.log("running");
module.exports = app.listen(process.env.PORT || 7002);