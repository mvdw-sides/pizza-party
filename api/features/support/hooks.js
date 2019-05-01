const { BeforeAll, AfterAll } = require("cucumber");
let server;
BeforeAll(() => {
  process.env.NODE_ENV = "test";
  process.env.CLI = true;
  process.env.PORT = 7402; // 74xx is testing range

  server = require("../../lib");
  return true;
});
