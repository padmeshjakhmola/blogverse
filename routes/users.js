const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const { sequelize } = require("../db");

router.get("/", async (req, res) => {
  const user = await User.findAll();
  res.status(200).json(user);
});

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required")
      .not()
      .isEmpty()
      .custom(async (email) => {
        const existingEmail = await User.findOne({
          where: {
            email,
          },
        });
        if (existingEmail) {
          throw new Error("Email already exist");
        }
      }),
    check("phone", "Phone should be 10 digits").optional().isLength({
      min: 10,
      max: 10,
    }),
    check("password", "Password must be 6 or more characters")
      .optional()
      .isLength({
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

      const { name, email, phone, password } = req.body;

      const user = await User.create({ name, email, phone, password });
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json({
        error: "login_fail",
        message: e.message,
      });
    }
  }
);

module.exports = router;
