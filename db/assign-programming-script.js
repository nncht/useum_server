const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const Category = require('../models/Category.model');
const Item = require('../models/Item.model');

const MONGO_URI = 'mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'


mongoose
  .connect(MONGO_URI)
  .then(() => {
    // find the programming category and get its ID
    Category.findOne({ category: 'Programming' })
      .then(category => {
        if (!category) {
          console.error('programming category not found in the database');
          return;
        }

        // update collections and items with 'programming' in their name or description to use the programming category ID
        Promise.all([
          Collection.updateMany(
            { $or: [{ name: /programming/i }, { description: /programming/i }] },
            { $push: { categories: category._id } }
          ),
          Item.updateMany(
            { $or: [{ name: /programming/i }, { description: /programming/i }] },
            { $push: { categories: category._id } }
          )
        ])
          .then(() => console.log('Collections and Items updated with programming category'))
          .catch(error => console.error(error))
          .finally(() => mongoose.disconnect());
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
