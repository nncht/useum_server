const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection.model');

router.post('/collections', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Please provide a name for the collection' });
      return;
    }
    const collection = await Collection.create({ name });
    res.status(201).json({ collection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
});

router.get('/collections', async (req, res, next) => {
    try {
      // Retrieve all the collections from the database
      const collections = await Collection.find({});
  
      // Send back a success response with the collections
      res.status(200).json({ collections });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      next(error);
    }
  });

module.exports = router;