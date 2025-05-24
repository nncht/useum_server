// ℹ️ Access environment variables/settings
require("dotenv").config();

// Import CORS
const cors = require("cors");

// ℹ️ Connect to the database
require("./db");

// Import Express
const express = require("express");
const app = express();

// ✅ Define allowed origins
const allowedOrigins = ['https://useum.netlify.app'];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow Postman, curl, etc.
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Middleware setup (parsers, logger, etc.)
require("./config")(app);

// ✅ Routes
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/item.routes"));
app.use("/", require("./routes/collection.routes"));
app.use("/", require("./routes/upload.routes"));
app.use("/", require("./routes/categories.routes"));
app.use("/", require("./routes/bookmarks.routes"));
app.use("/", require("./routes/search.routes"));
app.use("/", require("./routes/user.routes"));

// ✅ Error handling (must be after all routes)
require("./error-handling")(app);

module.exports = app;
