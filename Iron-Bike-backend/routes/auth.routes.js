const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

router.post("/signup", isNotAuthenticated, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body, "PASS");

    // Check if email or password or name are provided as empty string
    if (email === "" || password === "" || username === "") {
      res.status(400).json({ message: "Provide email, password and username" });
      return;
    }

    // Check if email or password or username contains whitespace \s
    if (
      email.includes(" ") ||
      password.includes(" ") ||
      username.includes(" ")
    ) {
      res.status(400).json({
        message: "No whitespace allowed in email, password or username",
      });
      return;
    }
    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res
        .status(400)
        .json({ message: "Please provide a valid email address." });
      return;
    }

    const passwordRegex = /.{6,}/;
    if (!passwordRegex.test(password)) {
      res
        .status(400)
        .json({ message: "Password must have at least 6 characters." });
      return;
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(createdUser, "new user");

    // const { email, username, _id } = createdUser

    // Send user object without password
    const user = {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    };

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", isNotAuthenticated, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Please check the email address." });
      return;
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      res.status(401).json({ error: "Credentials not found" });
      return;
    }

    if (bcrypt.compareSync(password, foundUser.password)) {
      const payload = {
        id: foundUser._id,
        email,
        username: foundUser.username,
        isAdmin: foundUser.isAdmin,
      };

      const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      res.status(200).send({ authToken: authToken, message: "login ok" });
      return;
    } else {
      res.status(401).json({ error: "Credentials not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(req.headers, "HEADERS");

  // console.log(req.payload.email, "jwt");
  res.status(200).json(req.payload);
});

module.exports = router;
