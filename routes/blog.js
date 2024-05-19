const express = require("express");
const Blog = require("../models/blog");
const { sequelize } = require("../db");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(`Connected to database: ${sequelize.config.database}`);

    const { title, content, author } = req.body;
    const newBlog = await Blog.create({
      title,
      content,
      author,
    });

    res.status(201).json(newBlog);
  } catch (e) {
    res.status(500).json({
      error: "server_error",
      message: e.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (e) {
    res.status(500).json({
      error: "fetch_error",
      message: e.message,
    });
  }
});

module.exports = router;
