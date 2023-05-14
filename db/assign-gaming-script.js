const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const Category = require('../models/Category.model');
const Item = require('../models/Item.model');

const MONGO_URI = 'mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'

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
