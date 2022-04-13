const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

//  POST /api/users  -  Creates a new user
router.post("/create", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const response = await User.create({ username, email, password });
    res.status(201).json(response);
  } catch (err) {
    res.json(err);
  }
});
//  POST /api/users  -  Find users

router.get("/list", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

//  PUT /api/users  -  Update users

router.put("/update/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const user = await Project.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//  DELETE /api/users  -  Delete users

router.delete("/delete/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    await User.findByIdAndRemove(userId);

    res.status(204).send();
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
