const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const { sequelize } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const user = await User.findAll();
  res.status(200).json(user);
});

router.post(
  "/register",
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

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        phone,
        password: encryptedPassword,
      });
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json({
        error: "login_fail",
        message: e.message,
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json("not_exist");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json("invalid_credentials");
      }

      res.status(200).json({
        message: "Successfully login",
        user,
      });

      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   process.env.JWT_SECRET,
      //   {
      //     expiresIn: "1h",
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
    } catch (e) {
      res.status(500).json({
        error: "login_fail",
        message: e.message,
      });
    }
  }
);

module.exports = router;
