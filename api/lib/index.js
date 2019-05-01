"use strict";

var _koa = _interopRequireDefault(require("koa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = new _koa["default"]();
app.use(function (ctx) {
  ctx.body = "Hello Koa";
});
app.listen(7002);