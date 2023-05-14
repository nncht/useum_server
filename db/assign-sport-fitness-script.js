const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const Category = require('../models/Category.model');
const Item = require('../models/Item.model');

const MONGO_URI = 'mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // find the gaming category and get its ID
    Category.findOne({ category: 'Sport & Fitness' })
      .then(category => {
        if (!category) {
          console.error('sports category not found in the database');
          return;
        }

        // update collections and items with 'gaming' in their name or description to use the programming category ID
        Promise.all([
          Collection.updateMany(
            { $or: [{ name: /gym/i }, { description: /gym/i }, { name: /sports/i }, { description: /sports/i }, { name: /basketball/i }, { description: /basketball/i }, { name: /football/i }, { description: /football/i} ] },
            { $push: { categories: category._id } }
          ),
          Item.updateMany(
            { $or: [{ name: /gym/i }, { description: /gym/i }, { name: /sports/i }, { description: /sports/i }, { name: /basketball/i }, { description: /basketball/i }, { name: /football/i }, { description: /football/i},{ description: /workout/i }, { name: /training/i }, { description: /muscle/i }, { name: /workouts/i }, { description: /training/i }, { name: /workout/i }, { description: /exercise/i} ] },
            { $push: { categories: category._id } }
          )
        ])
          .then(() => console.log('Collections and Items updated with sports category'))
          .catch(error => console.error(error))
          .finally(() => mongoose.disconnect());
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
