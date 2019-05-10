const routes = require("next-routes");

module.exports = routes()
  .add("home", "/", "index")
  .add("checkout", "/checkout", "checkout")
  .add("product", "/product/:id", "product")
  .add("orders", "/orders", "orders")
  .add("order", "/orders/:guid", "order");
