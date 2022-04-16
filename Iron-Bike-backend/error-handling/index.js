module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error(
      "ERROR",
      "METHOD: ",
      req.method,
      " PATH: ",
      req.path,
      "erreur: ",
      err
    );
    // console.error(err.stack, "ERR STAAAACK");

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      // res.redirect("/api");
      res.status(500).json({
        errorMessage: "Internal server error. Check the server console",
      });
    }
  });
};
