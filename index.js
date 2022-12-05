const express = require("express");
const app = express();
require("dotenv/config");
require("./db");
require("./config")(app);
const { isAuthenticated } = require("./middleware/jwt.middleware");
cors = require("cors");

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv

// ℹ️ Connects to the database

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
app.use(express.json());

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", isAuthenticated, adminRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/users", isAuthenticated, userRoutes);

const brandRoutes = require("./routes/brand.routes");
app.use("/api/brand", brandRoutes);

const productsRoutes = require("./routes/product.routes");
app.use("/api/products", productsRoutes);

const cartRouter = require("./routes/cart.routes");
app.use("/api/cart", cartRouter);

const checkoutRouter = require("./routes/stripe.routes");
app.use("/api/checkout", checkoutRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
