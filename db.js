const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  "postgres",
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: true,
  }
);

const connectToDB = async () => {
  try {
    sequelize.authenticate();
    console.log("Postgres DB has been connected");
  } catch (e) {
    console.error("Unable to connect to the database");
  }
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    // await sequelize.sync({ force: true }).then(() => {
    //   console.log("Database & tables created!");
    // });
    console.log("Database synced.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

module.exports = { sequelize, connectToDB };
