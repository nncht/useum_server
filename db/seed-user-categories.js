const mongoose = require('mongoose');
const User = require('../models/User.model');
const Category = require('../models/Category.model');

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server"

// Connect to the MongoDB database
mongoose
.connect(MONGO_URI)
.then(() => {
    // loop through categories array and create category documents in the database

// Retrieve all categories from the database
        Category.find({}).then((categories) => {
            // Update each user's categories property with the existing categories
            User.updateMany({}, { categories: categories }).then(() => {
                console.log('Seed data successfully added.');
                mongoose.disconnect();
            });
        })

      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));


