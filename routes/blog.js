const express = require("express");
const Blog = require("../models/blog");
const { sequelize } = require("../db");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content cannot be empty").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(`Connected to database: ${sequelize.config.database}`);

      const { title, content, author, password } = req.body;

      const newBlog = await Blog.create({
        title,
        content,
        author,
        password,
      });

      res.status(201).json(newBlog);
    } catch (e) {
      res.status(500).json({
        error: "server_error",
        message: e.message,
      });
    }
  }
);

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
