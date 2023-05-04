const { isAuthenticated } = require('../middleware/jwt.middleware');
const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');


router.post('/items', async (req, res, next) => {
	try {
		// Retrieve the item data from the request body
		const { name, description } = req.body;

		// Do some validation on the input data
		if (!name) {
			res.status(400).json({ message: 'Please provide all the required fields.' });
			return;
		}

		// Create the new item
		const newItem = await Item.create({
			name,
			description,
		});

		// Send back a success response with the newly created item
		res.status(201).json({ item: newItem });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

router.get('/items', async (req, res, next) => {
	try {
		// Retrieve all the items from the database
		const items = await Item.find({});

		// Send back a success response with the items
		res.status(200).json({ items });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

module.exports = router;
