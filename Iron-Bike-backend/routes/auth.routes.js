const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const {
  isAuthenticated,
  isNotAuthenticated,
} = require('../middleware/jwt.middleware');
const User = require('../models/User.model');
const { SignAndLogErrors } = require('../error-handling/SignAndLogErrors');
//
router.get('signUp', isNotAuthenticated, async (req, res, next) => {
  console.log('access to sign up route');
  res.status(200).json({ message: 'access to sign up route' });
});
//
router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if email or password or name are provided as empty string

    if (email === '' || username === '' || password === '') {
      const error = SignAndLogErrors('none', email, username);
      res.status(406).json(error);

      return;
    }

    // Check if email or password or username contains whitespace \s

    if (
      email.includes(' ') ||
      password.includes(' ') ||
      username.includes(' ')
    ) {
      const error = SignAndLogErrors('whiteSpace', email, username);
      res.status(406).json(error);
      return;
    }
    // Use regex to validate the email format

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      const error = SignAndLogErrors('email', email, username);
      res.status(406).json(error);
      return;
    }

    const passwordRegex = /.{6,}/;
    if (!passwordRegex.test(password)) {
      const error = SignAndLogErrors('password');
      res.status(406).json(error);
      return;
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      const error = SignAndLogErrors('exist', email, '');
      res.status(406).json(error);
      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(createdUser, 'new user');

    const payload = {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    };

    const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });

    res
      .status(201)
      .json({ authToken: authToken, message: 'Welcome ! You Signed up.' });
  } catch (error) {
    console.log(error, 'error au sign up');
    next(error);
    return;
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Use regex to validate the email format

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      const error = SignAndLogErrors('email', email);
      res.status(406).json(error);
      return;
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      const error = SignAndLogErrors('notFound', email);
      console.log(error, 'USER NOT FOUND');
      res.status(401).json(error);
      return;
    }

    if (bcrypt.compareSync(password, foundUser.password)) {
      const payload = {
        id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        isAdmin: foundUser.isAdmin,
      };

      const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1h',
      });

      res.status(200).send({
        authToken: authToken,
        message: 'login ok du back end',
      });
      return;
    } else {
      const error = SignAndLogErrors('wrong', email);
      res.status(401).json(error);
      return;
    }
  } catch (error) {
    next(error);
    return;
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  try {
    console.log(req.headers, '-----------------------HEADERS');
    console.log(req?.payload?.email, '-------------------jwt');
    res.status(200).json(req?.payload);
  } catch (error) {
    console.log(Object.keys(error), 'les clefs errors');
    next(error);
    return;
  }
});

module.exports = router;
