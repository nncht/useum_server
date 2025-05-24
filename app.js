// ℹ️ Access environment variables/settings
require("dotenv").config();

// Import CORS
const cors = require("cors");

// ℹ️ Connect to the database
require("./db");

// Import Express
const express = require("express");
const app = express();

// ✅ CORS Setup
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  'https://useum.netlify.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no 'origin' (like mobile apps, Postman, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly define allowed headers
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

// ✅ Optional: Test CORS route (good for debugging)
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// ✅ Error handling (must be after all routes)
require("./error-handling")(app);

// ✅ Export app for use in server.js or main entry
module.exports = app;
