// const express = require("express");
// const app = express();
// const userRouter = require("./routes/users");
// const blogRouter = require("./routes/blog");

// const baseRouter = express.Router();

// app.use(express.json());

// baseRouter.use("/users", userRouter);
// baseRouter.use("/blog", blogRouter);

// app.use("/v1", baseRouter);

// module.exports = app;

const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const blogRouter = require("./routes/blog");
const { sequelize } = require("./db");

const baseRouter = express.Router();

app.use(express.json());

baseRouter.use("/users", userRouter);
baseRouter.use("/blog", blogRouter);

app.use("/v1", baseRouter);


module.exports = app;
