const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');
const User = require('../models/User.model');

router.post('/collections', async (req, res, next) => {
	try {
		const { name, createdBy, description } = req.body;
		if (!name) {
			res.status(400).json({ message: 'Please provide a name for the collection' });
			return;
		}

		const collection = await Collection.create({ name, createdBy, description });

		// Update the user's collections array
		await User.findByIdAndUpdate(createdBy, { $push: { collections: collection._id } });

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

router.get('/collections/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const collection = await Collection.findById(id);

		res.status(200).json(collection);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

module.exports = router;
