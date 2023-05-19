const mongoose = require("mongoose");
const Category = require("../models/Category.model");

// array of category names
const categories = [
  { category: "Gaming" },
  { category: "Software Engineering" },
  { category: "Content Creation" },
  { category: "UX/UI Design" },
  { category: "Graphic Design" },
  { category: "Photography & Video" },
  { category: "Traditional Art" },
  { category: "Digital Art" },
  { category: "Music Production" },
  { category: "Fashion & Tailoring" },
  { category: "Beauty & Cosmetics" },
  { category: "Crafts & DIY" },
  { category: "Culinary" },
  { category: "Gardening & Landscaping" },
  { category: "Travel" },
  { category: "Language Learning & Translation" },
  { category: "Writing & Journalism" },
  { category: "Film & TV Production" },
  { category: "Acting & Theater" },
  { category: "Cosplay & Role-playing" },
  { category: "Sport & Fitness" },
  { category: "Outdoor Activities" },
  { category: "Water Sports" },
  { category: "Other" },
  {category: "Programming"},
  {category: "Cinema & Movies"},
  {category: "Literature"},
  {category: "Music"},
  {category: "Books & Comics"},
  {category: "Anime & Manga"},
  {category: "Activism & Social Movements"},
  {category: "Politics"} ]

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
