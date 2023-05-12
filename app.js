// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const itemRoutes = require("./routes/item.routes");
app.use("/", itemRoutes);

const collectionRoutes = require("./routes/collection.routes");
app.use("/", collectionRoutes);

const uploadRoutes = require("./routes/upload.routes");
app.use("/", uploadRoutes);

const categoryRoutes = require("./routes/categories.routes");
app.use("/", categoryRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);






const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
