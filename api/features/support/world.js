const { setWorldConstructor } = require("cucumber");
const axios = require("axios");

process.env.NODE_ENV = "test";
process.env.CLI = true;
process.env.PORT = 7402; // 74xx is testing range

// for now just use the real life running one :shrug:
// const server = require("../../lib");

class customWorld {
  constructor() {
    this.http = axios.create({
      baseURL: "http://api.local.test"
    });

    this.body = {};
    this.headers = {};
    this.response = {};
  }

  async post(path) {
    this.response = {};
    this.response = await this.http.post(path, this.body, {
      headers: this.headers
    });
    this.clear();
    return this.response;
  }

  async get(path) {
    this.response = {};
    this.response = await this.http.get(path, { headers: this.headers });
    this.clear();
    return this.response;
  }

  async delete(path) {
    this.response = {};
    this.response = await this.http.delete(path, { headers: this.headers });
    this.clear();
    return this.response;
  }

  async put(path) {
    this.response = {};
    this.response = await this.http.put(path, this.body, {
      headers: this.headers
    });
    this.clear();
    return this.response;
  }

  clear() {
    this.body = {};
    this.headers = {};
  }
}

setWorldConstructor(customWorld);
