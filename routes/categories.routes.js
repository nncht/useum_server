const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const User = require('../models/User.model');
const Category = require('../models/Category.model');

router.get('/categories', async (req, res, next) => {

    try {
        // Retrieve all the categories from the database
        const categories = await Category.find({});

        // Send back a success response with the collections
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }





})




module.exports = router;
