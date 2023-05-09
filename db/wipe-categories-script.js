const mongoose = require('mongoose');
const Category = require('../models/Category.model');

mongoose.connect('mongodb://127.0.0.1:27017/association_server', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    return Category.deleteMany({});
  })
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} categories.`);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from database.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });