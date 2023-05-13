const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const Item = require('../models/Item.model');

mongoose.connect('mongodb://127.0.0.1:27017/association_server', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    return Collection.find({});
  })
  .then((collections) => {
    let promises = [];
    for (let collection of collections) {
      promises.push(Item.find({ categories: collection.categories }).limit(6).exec()

        .then((items) => {
          let itemPromises = [];
          for (let item of items) {
            item.collections.push(collection._id);
            itemPromises.push(item.save());
          }
          return Promise.allSettled(itemPromises)
            .then(() => {
              collection.items = items.map((item) => item._id);
              return collection.save();
            });
        }));
    }
    return Promise.allSettled(promises); // Wait for all promises to settle
  })
  .then(() => {
    console.log('Items and collections assigned successfully!');
    return mongoose.disconnect(); // Disconnect from database
  })
  .then(() => {
    console.log('Disconnected from database!');
  })
  .catch((error) => {
    console.error('Error:', error);
    mongoose.disconnect();
  });

