const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

// Signup routes
router.post("/signup", async (req, res, next) => {
  const { email, password, username, imageUrl } = req.body;

  try {
    if (email === "" || password === "" || username === "") {
      res.status(400).json({ message: "Provide email, password and username" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    // Use regex to validate the password format
    const passwordRegex =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?\-]).{8,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 8 characters and contain at least one number, one special character, one lowercase and one uppercase letter.",
      });
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    // Password hashing
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // If no user image is chosen, eplace empty string with default user image path
    if (imageUrl !== "") {
      const createdUser = await User.create({
        email,
        password: hashedPassword,
        username,
        imageUrl,
      });
      const {
        email: createdEmail,
        username: createdName,
        _id: createdId,
        imageUrl: createdImageUrl,
      } = createdUser;
      const user = {
        email: createdEmail,
        username: createdName,
        _id: createdId,
        imageUrl: createdImageUrl,
      };
      res.status(201).json({ user });
    } else {
      const createdUser = await User.create({
        email,
        password: hashedPassword,
        username,
      });
      const {
        email: createdEmail,
        username: createdName,
        _id: createdId,
      } = createdUser;
      const user = {
        email: createdEmail,
        username: createdName,
        _id: createdId,
      };
      res.status(201).json({ user });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).json({ message: error.message });
    } else if (error.code === 11000) {
      res.status(500).json({
        message:
          "Username and email need to be unique. Either username or email is already used.",
      });
    } else {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }
});

// Login routes
router.post("/login", async (req, res, next) => {
  const { loginName, password } = req.body;

  try {

    if (loginName === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
    }

    //test if login word is email or username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    let email;
    let username;
    let foundUser;

    if (emailRegex.test(loginName)) {
      email = loginName;
      foundUser = await User.findOne({ email });
    } else {
      username = loginName;
      foundUser = await User.findOne({ username });
    }


    if (!foundUser) {
      res.status(400).json({ message: "User not found." });
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      const { _id, email, username } = foundUser;
      const payload = { _id, email, username };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken });
    } else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } catch (error) {
    console.log(error);
    next(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);

  res.status(200).json(req.payload);
});

module.exports = router;
