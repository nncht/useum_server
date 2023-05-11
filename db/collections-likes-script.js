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
      const numLikes = Math.floor(Math.random() * 11) + 10;
      const likes = [];

      while (likes.length < numLikes) {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomUserIndex];

        if (!likes.includes(randomUser._id)) {
          likes.push(randomUser._id);
          await User.updateOne({ _id: randomUser._id }, { $addToSet: { likedCollections: collection._id } });
        }
      }

      await Collection.updateOne({ _id: collection._id }, { $set: { likes } });
    }

    console.log('Likes added successfully.');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from database.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
