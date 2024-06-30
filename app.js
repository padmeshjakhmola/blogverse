const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/users");
const blogRouter = require("./routes/blog");
const newsHeadlines = require("./routes/news");

const baseRouter = express.Router();

app.use(bodyParser.json());
app.use(cors());

baseRouter.use("/users", userRouter);
baseRouter.use("/blog", blogRouter);
baseRouter.use("/news", newsHeadlines);

app.use("/v1", baseRouter);

module.exports = app;
