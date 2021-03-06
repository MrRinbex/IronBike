const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.TOKEN_SECRET;

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
});

// Function used to extracts the JWT token from the request's 'Authorization' Headers
// Authorization: Bearer <JWT>

function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  console.log('Auth in progress');

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      // Get the encoded token string and return it
      const token = req.headers.authorization.split(' ')[1];
      console.log(token, 'The TOKEN');

      return token;
    }
    console.log('<><<<<<<<<<<<     No TOKEN');
    return null;
  } catch (err) {
    console.log(err, 'error de getToken JWT MIDDLEWARE');
  }
}

const isNotAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!req.headers.authorization) {
      // console.log("pas de token", token);
      next();
    }
    if (token) {
      // console.log("YA UN TOKEN ", token);
      jwt.verify(token, SECRET, function (error, decoded) {
        console.log(error, 'error jwt');
        if (error?.name === 'TokenExpiredError' || error) {
          next();
        }
        if (decoded) {
          res.status(307).json({ message: 'Already logged in, (redirected)' });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Oops something get wrong, try again !' });
  }
};

module.exports = { isAuthenticated, isNotAuthenticated };
