const mongoose = require('mongoose');
const Category = require('../models/Category.model');

// array of category names
const categories = [
  { category: 'Books' },
  { category: 'Movies' },
  { category: 'Music' },
  { category: 'Music Production' },
  { category: 'Digital Illustration' },
  { category: 'Gaming' },
  { category: 'Photography Equipment' },
  { category: 'Gym' },
  { category: 'Football' },
  { category: 'Basketball' },
  { category: 'Programming' },
  { category: 'RGB Light' },
  // add more categories here
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server"

mongoose
.connect(MONGO_URI)
.then(() => {
    // loop through categories array and create category documents in the database
    Category.create(categories)
      .then(() => console.log('Database seeded with categories'))
      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));