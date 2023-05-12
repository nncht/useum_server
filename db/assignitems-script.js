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
          for (let item of items) {
            item.collections.push(collection._id);
            promises.push(item.save());
            collection.items.push(item._id);
          }
          return collection.save();
        }));
    }
    return Promise.all(promises); // Wait for all promises to resolve
  })
  .then(() => {
    console.log('Items assigned to collections successfully!');
    return mongoose.disconnect(); // Wait for all sessions to close
  })
  .then(() => {
    console.log('Disconnected from database!');
  })
  .catch((error) => {
    console.error('Error:', error);
    mongoose.disconnect();
  });
