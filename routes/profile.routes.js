const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Collection = require('../models/Collection.model');
const Category = require('../models/Category.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');


router.get('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;

      const user = await User.findOne({ username }).populate('collections').populate('categories');

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      next(error);
    }
  });


module.exports = router;
