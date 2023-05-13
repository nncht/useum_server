const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const User = require('../models/User.model');

mongoose.connect('mongodb://127.0.0.1:27017/association_server', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to database!');

    const users = await User.find({}, '_id');
    const collections = await Collection.find({}, '_id');

    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomUserIndex];

      await Collection.updateOne({ _id: collection._id }, { $set: { createdBy: randomUser._id } });
      await User.updateOne({ _id: randomUser._id }, { $addToSet: { collections: collection._id } });
    }

    console.log('Collections updated successfully.');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from database.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });