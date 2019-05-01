import Sequelize from "sequelize";
import { Address } from "./Address";

let imports = [Address];
const models = {};

const env = process.env.NODE_ENV || "production";
const config = require(`../../config/sequelize/database.js`)[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config
  });
}

imports.forEach(
  entity => (models[entity.name] = entity.init(sequelize, Sequelize))
);

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
  Sequelize
};

module.exports = db;
