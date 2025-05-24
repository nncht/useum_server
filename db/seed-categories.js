const mongoose = require("mongoose");
const Category = require("../models/Category.model");

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
  { category: "Programming" },
  { category: "Cinema & Movies" },
  { category: "Literature" },
  { category: "Music" },
  { category: "Books & Comics" },
  { category: "Anime & Manga" },
  { category: "Activism & Social Movements" },
  { category: "Politics" },
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb+srv://admin:8XDWEkL8Qn9jp0BT@useum.ifhntqc.mongodb.net/useum?retryWrites=true&w=majority";

async function seedCategories() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected!");

    // Clear existing categories (optional)
    await Category.deleteMany();
    console.log("Old categories cleared.");

    // Insert new categories
    await Category.insertMany(categories);
    console.log("Database seeded with categories!");

  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit();
  }
}

seedCategories();
