// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
app.use(express.json());

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

const brandRoutes = require("./routes/brand.routes");
app.use("/api/brand", brandRoutes);

const productsRoutes = require("./routes/product.routes");
app.use("/api/products", productsRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling/")(app);

module.exports = app;
