const mongoose = require('mongoose');
const User = require('../models/User.model');


const MONGO_URI = 'mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const numUsers = 100; // total number of users

async function createFollowers() {
  try {
    // get all users from the database
    const users = await User.find({}, '_id');

    // loop through each user and randomly select other users to follow
    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];

      // randomly select the number of users to follow
      const numFollowers = Math.floor(Math.random() * 11) + 10;

      // randomly select other users to follow
      const followers = [];
      while (followers.length < numFollowers) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        if (randomUser._id !== currentUser._id && !followers.includes(randomUser._id)) {
          followers.push(randomUser._id);
        }
      }

      // update the followers field of the current user
      await User.updateOne({ _id: currentUser._id }, { $set: { followers } });

      // update the following field of each follower user
      for (let j = 0; j < followers.length; j++) {
        const followerId = followers[j];
        await User.updateOne({ _id: followerId }, { $addToSet: { following: currentUser._id } });
      }
    }

    console.log('Followers created successfully.');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

createFollowers();