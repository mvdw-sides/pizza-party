// export a json object
module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "pizza-party-database",
    host: process.env.CLI ? "127.0.0.1" : "db",
    port: process.env.CLI ? 54320 : 5432,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: null,
    database: "pizza-party-test-database",
    host: process.env.CLI ? "127.0.0.1" : "db",
    port: process.env.CLI ? 54320 : 5432,
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: null,
    database: "pizza-party-database-production",
    host: process.env.CLI ? "127.0.0.1" : "db",
    port: process.env.CLI ? 54320 : 5432,
    dialect: "postgres"
  }
};
