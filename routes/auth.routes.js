const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

// Signup route
router.post("/signup", async (req, res, next) => {
  const { email, password, username, imageUrl } = req.body;

  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Provide email, password and username" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Provide a valid email address." });
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?\\-]).{8,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must have at least 8 characters and contain at least one number, one special character, one lowercase and one uppercase letter.",
      });
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData = {
      email,
      password: hashedPassword,
      username,
      imageUrl: imageUrl || undefined, // Optional: will use default if not provided
    };

    const createdUser = await User.create(userData);
    const { _id, email: createdEmail, username: createdName, imageUrl: createdImageUrl } = createdUser;

    return res.status(201).json({
      user: {
        _id,
        email: createdEmail,
        username: createdName,
        imageUrl: createdImageUrl,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    } else if (error.code === 11000) {
      return res.status(400).json({
        message: "Username and email need to be unique. Either username or email is already used.",
      });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Login route
router.post("/login", async (req, res, next) => {
  const { loginName, password } = req.body;

  try {
    if (!loginName || !password) {
      return res.status(400).json({ message: "Provide email/username and password." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isEmail = emailRegex.test(loginName);

    const foundUser = isEmail
      ? await User.findOne({ email: loginName })
      : await User.findOne({ username: loginName });

    if (!foundUser) {
      return res.status(400).json({ message: "User not found." });
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid email/username or password." });
    }

    const { _id, email, username } = foundUser;
    const payload = { _id, email, username };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    return res.status(200).json({ authToken });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Token verify route
router.get("/verify", isAuthenticated, (req, res) => {
  console.log("req.payload", req.payload);
  return res.status(200).json(req.payload);
});

module.exports = router;
