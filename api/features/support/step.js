const { Given, When, Then } = require("cucumber");
const _ = require("underscore");

const exceptionList = ["createdAt", "updatedAt"];

const cleanUp = object => {
  let response;
  if (Array.isArray(object)) {
    response = [];
    response = object.map(cleanup);
  } else {
    response = { ...object };
    exceptionList.forEach(exception => delete response[exception]);
  }

  return response;
};

Given("the client provides the header {string}", function(header) {
  const [key, value] = header.split(":");
  this.headers[key] = value;
  return true;
});

When("the client does a GET request to {string}", async function(path) {
  try {
    const request = await this.get(path);
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
});

const isJson = ob => {
  try {
    const obj = JSON.parse(ob);
    return obj;
  } catch (e) {
    return false;
  }
};

Then("the response body should be:", function(expectedBody) {
  try {
    const expected = isJson(expectedBody);
    if (expected) {
      if (!_.isEqual(cleanUp(expected), cleanUp(expectedBody))) {
        throw Error(`Body did not match.`);
      }

      return Promise.resolve();
    }

    if (expectedBody === this.response.data) {
      return Promise.resolve();
    }

    throw Error(`"${this.response.data}" did not match "${expectedBody}"`);
  } catch (e) {
    return Promise.reject(e);
  }
});

Then("the response status code should be {int}", function(status) {
  return status === this.response.status;
});
