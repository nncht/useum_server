const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');

const collections = [
    {
      name: 'Collection 1',
      description: 'Description for Collection 1',
      likes: ['645901e5872e3de30689d72f']
    },
    {
      name: 'Collection 2',
      description: 'Description for Collection 2',
      likes: ['645901e5872e3de30689d72f', '645901e5872e3de30689d72e']
    },
    {
      name: 'Collection 3',
      description: 'Description for Collection 3',
      likes: ['645901e5872e3de30689d72f', '645901e5872e3de30689d72e', '645901e5872e3de30689d72d']
    },
    {
      name: 'Collection 4',
      description: 'Description for Collection 4',
      likes: ['645901e5872e3de30689d72f', '645901e5872e3de30689d72e']
    },
    {
      name: 'Collection 5',
      description: 'Description for Collection 5',
      likes: ['645901e5872e3de30689d72f', '645901e5872e3de30689d72e']
    }
  ];

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/association_server';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');

    Collection.create(collections)
      .then(() => console.log('Database seeded with collections'))
      .catch(error => console.error(error))
      .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));
