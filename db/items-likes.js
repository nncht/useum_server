const mongoose = require('mongoose');
const Item = require('../models/Item.model');
const User = require('../models/User.model');

mongoose.connect('mongodb://127.0.0.1:27017/association_server', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to database!');

    const users = await User.find({}, '_id');
    const items = await Item.find({}, '_id');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const numLikes = Math.floor(Math.random() * 11) + 10;
      const likes = [];

      while (likes.length < numLikes) {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomUserIndex];

        if (!likes.includes(randomUser._id)) {
          likes.push(randomUser._id);
          await User.updateOne({ _id: randomUser._id }, { $addToSet: { likedItems: item._id } });
        }
      }

      await Item.updateOne({ _id: item._id }, { $set: { likes } });
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
