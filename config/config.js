require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_development",
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_test",
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_production",
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
  },
};
