// ℹ️ Gets access to environment variables/settings
require("dotenv").config();

// Import CORS
const cors = require("cors");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");

const app = express();

// CORS Setup
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  'https://useum.netlify.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middleware setup
require("./config")(app);

// Routes
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

const bookmarksRoutes = require("./routes/bookmarks.routes");
app.use("/", bookmarksRoutes);

const searchRoutes = require("./routes/search.routes");
app.use("/", searchRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

// Optional: CORS test route
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Error handling
require("./error-handling")(app);

module.exports = app;
