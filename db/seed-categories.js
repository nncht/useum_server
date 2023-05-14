const mongoose = require("mongoose");
const Category = require("../models/Category.model");

// array of category names
const categories = [
  { category: "Gaming" },
  { category: "Programming" },
  { category: "Content Creation" },
  { category: "UX/UI Design" },
  { category: "Graphic Design" },
  { category: "Photography & Video" },
  { category: "Traditional Art" },
  { category: "Digital Art" },
  { category: "Music / Audio Engineering" },
  { category: "Tailoring & Fashion Design" },
  { category: "Cosmetics & Beauty" },
  { category: "Crafts & DIY" },
  { category: "Cooking & Baking" },
  { category: "Wine & Beer Making" },
  { category: "Gardening & Landscaping" },
  { category: "Travel & Exploration" },
  { category: "Language Learning & Translation" },
  { category: "Writing & Journalism" },
  { category: "Film & TV Production" },
  { category: "Acting & Theater" },
  { category: "Cosplay & Role-playing" },
  { category: "Sport & Fitness" },
  { category: "Outdoor Activities" },
  { category: "Water Sports" },
  { category: "Other" },
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server";

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
