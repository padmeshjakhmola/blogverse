const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
      ca: process.env.POSTGRES_SSH_CERTIFICATE,
    },
  },
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres DB has been connected");
    // await sequelize.sync({ force: true }).then(() => {
    //   console.log("Database & tables are recreated!");
    // });
  } catch (e) {
    console.error("Unable to connect to the database", e);
  }
};

// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     await sequelize.sync();
//     // await sequelize.sync({ force: true }).then(() => {
//     //   console.log("Database & tables created!");
//     // });
//     console.log("Database synced.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// startServer();

module.exports = { sequelize, connectToDB };
