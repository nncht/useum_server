const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');

mongoose.connect('mongodb://127.0.0.1:27017/association_server', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    return Comment.deleteMany({});
  })
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} comments.`);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from database.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });