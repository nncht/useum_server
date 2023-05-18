const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const Item = require('../models/Item.model');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const MONGO_URI = 'mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    return Collection.find({});
  })
  .then((collections) => {
    let promises = [];
    for (let collection of collections) {
      promises.push(Item.find({ categories: collection.categories })
        .then((items) => {
          // Shuffle the items array before selecting the first 6 elements
          shuffleArray(items);
          items = items.slice(0, 6);
          for (let item of items) {
            item.collections.push(collection._id);
            collection.items.push(item._id);
            promises.push(item.save());
          }
          return collection.save();
        }));
    }
    return Promise.all(promises); // Wait for all promises to resolve
  })
  .then(() => {
    console.log('Items and collections assigned successfully!');
    return mongoose.disconnect(); // Wait for all sessions to close
  })
  .then(() => {
    console.log('Disconnected from database!');
  })
  .catch((error) => {
    console.error('Error:', error);
    mongoose.disconnect();
  });

