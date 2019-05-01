const { Given, When, Then } = require("cucumber");
const _ = require("underscore");

const exceptionList = {
  basic: ["createdAt", "updatedAt"],
  strict: ["id", "guid"]
};

const cleanUp = (object, options = { strict: false, additions: [] }) => {
  let response;
  if (Array.isArray(object)) {
    response = [];
    response = object.map(cleanUp);
  } else {
    response = { ...object };
    let exceptions = [...exceptionList.basic];
    if (options.strict) {
      exceptions = [...exceptions, ...exceptionList.strict];
    }
    if (options.additions) {
      exceptions = [...exceptions, ...options.additions];
    }

    exceptions.forEach(exception => delete response[exception]);
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
    await this.get(path);
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
});

const isJson = ob => {
  try {
    const obj = JSON.parse(ob);
    return [true, obj];
  } catch (e) {
    return [false];
  }
};

Then("the response body should be:", function(expectedBody) {
  try {
    const [isJSONObject, expected] = isJson(expectedBody);

    if (isJSONObject && typeof this.response.data !== "string") {
      if (!_.isEqual(cleanUp(this.response.data), cleanUp(expected))) {
        throw Error(
          `${JSON.stringify(
            cleanUp(this.response.data)
          )} Body did not match. ${JSON.stringify(cleanUp(expected))}`
        );
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
