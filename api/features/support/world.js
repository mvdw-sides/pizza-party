const { setWorldConstructor } = require("cucumber");

class customWorld {
  constructor() {
    console.log();
  }
}

setWorldConstructor(customWorld);
