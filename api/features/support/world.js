const { setWorldConstructor } = require("cucumber");
process.env.NODE_ENV = "test";
process.env.CLI = true;
process.env.PORT = 7402; // 74xx is testing range

class customWorld {
  constructor() {
    this.server = require("../../lib");
  }
}

setWorldConstructor(customWorld);
