const mongoose = require('mongoose');
const User = require('../models/User.model');
const Category = require('../models/Category.model');

const MONGO_URI =
'mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'


// Connect to the MongoDB database
mongoose
.connect(MONGO_URI)
.then(() => {
    // loop through categories array and create category documents in the database

// Retrieve all categories from the database
        Category.find({}).then((categories) => {
            // Update each user's categories property with the existing categories
            User.updateMany({}, { categories: categories }).then(() => {
                console.log('Seed data successfully added.');
                mongoose.disconnect();
            });
        })

      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));


