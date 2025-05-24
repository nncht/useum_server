// ℹ️ Package responsible for making the connection with MongoDB
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI from environment variables or fallback
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://admin:8XDWEkL8Qn9jp0BT@useum.ifhntqc.mongodb.net/useum?retryWrites=true&w=majority";

// 🔗 Mongoose connection setup
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`✅ Connected to MongoDB! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });

// Optional: Handle events (for better debugging)
mongoose.connection.on("error", (err) => {
  console.error("❗ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ Mongoose disconnected");
});
