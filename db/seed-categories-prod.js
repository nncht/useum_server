const mongoose = require("mongoose");
const Category = require("../models/Category.model");

// array of category names
const categories = [
  { category: "Content Creation" },
  { category: "Cosplay & Role-playing" },
  { category: "Crafts & DIY" },
  { category: "Culinary Arts" },
  { category: "Fashion & Beauty" },
  { category: "Film & Theater" },
  { category: "Gaming" },
  { category: "Gardening & Landscaping" },
  { category: "Music Production" },
  { category: "Outdoor Activities" },
  { category: "Other" },
  { category: "Photography & Video" },
  { category: "Software Engineering" },
  { category: "Sport & Fitness" },
  { category: "Travel & Exploration" },
  { category: "UX/UI Design" },
  { category: "Visual Arts & Design" },
  { category: "Writing & Journalism" },
];

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // loop through categories array and create category documents in the database
    Category.create(categories)
      .then(() => console.log("Database seeded with categories"))
      .catch((error) => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch((error) => console.error(error));
