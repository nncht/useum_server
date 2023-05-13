const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const Category = require('../models/Category.model');
const Item = require('../models/Item.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/association_server';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // find the gaming category and get its ID
    Category.findOne({ category: 'Gaming' })
      .then(category => {
        if (!category) {
          console.error('gaming category not found in the database');
          return;
        }

        // update collections and items with 'gaming' in their name or description to use the programming category ID
        Promise.all([
          Collection.updateMany(
            { $or: [{ name: /gaming/i }, { description: /gaming/i }] },
            { $push: { categories: category._id } }
          ),
          Item.updateMany(
            { $or: [{ name: /gaming/i }, { description: /gaming/i }] },
            { $push: { categories: category._id } }
          )
        ])
          .then(() => console.log('Collections and Items updated with gaming category'))
          .catch(error => console.error(error))
          .finally(() => mongoose.disconnect());
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
