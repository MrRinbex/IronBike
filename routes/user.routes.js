const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
// const {isAuthenticated } = require('../middleware/jwt.middleware');
const { verifyTokenAndAdmin } = require('../middleware/CheckToken');

//  POST /api/users  -  Creates a new user
router.post('/create', async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (req?.payload.isAdmin === true) {
      const response = await User.create({ username, email, password });
      res.status(201).json(response);
    } else {
      res
        .status(401)
        .json({ message: 'You are not allowed, contact an admin' });
    }
  } catch (err) {
    res.json(err);
  }
});
//  POST /api/users  -  Find users

router.get('/list', async (req, res, next) => {
  try {
    if (req?.payload.isAdmin === true) {
      const users = await User.find();
      res.json(users);
    } else {
      res
        .status(401)
        .json({ message: 'You are not allowed, contact an admin' });
    }
  } catch (err) {
    res.json(err);
  }
});

//  PUT /api/users  -  Update users

router.put('/update/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req?.payload.isAdmin === true) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      res.json(user);
    } else {
      res
        .status(401)
        .json({ message: 'You are not allowed, contact an admin' });
    }
  } catch (err) {
    res.json(err);
  }
});

//  DELETE /api/users  -  Delete users

router.delete('/delete/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req?.payload.isAdmin === true) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      await User.findByIdAndRemove(userId);

      res.status(204).send({ message: 'delete user ok !' });
    } else {
      res
        .status(401)
        .json({ message: 'You are not allowed, contact an admin' });
    }
  } catch (err) {
    console.log(err, 'delete error');
    res.json(err);
  }
});

module.exports = router;
