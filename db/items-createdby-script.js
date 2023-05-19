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
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomUserIndex];

      await Item.updateOne({ _id: item._id }, { $set: { createdBy: randomUser._id } });
      await User.updateOne({ _id: randomUser._id }, { $addToSet: { items: item._id } });
    }

    console.log('Items updated successfully.');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from database.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });