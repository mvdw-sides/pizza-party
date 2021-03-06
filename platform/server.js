const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

const { createServer } = require("http");
app.prepare().then(() => {
  console.log("going to listen");
  createServer(handler).listen(3000);
});
