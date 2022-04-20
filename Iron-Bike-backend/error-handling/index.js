module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ errorMessage: 'This route does not exist' });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error

    console.error(
      'ERROR',
      'METHOD: ',
      req.method,
      ' PATH: ',
      req.path,
      'error: ',
      err
    );
    console.log(Object.keys(err), ' les clefs de lerreur');

    //jwt errors
    if (err.code === 'invalid_token') {
      console.log('invalid token');
      res
        .status(401)
        // .res.redirect('/auth/login')
        .json('Invalid token.Please Loggin');
    }

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      // res.redirect("/api");
      res.status(500).json({
        errorMessage: 'Internal server error. Check the server console',
      });
    }
  });
};
