const { isAuthenticated } = require('../middleware/jwt.middleware');
const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');
const Category = require('../models/Category.model');
const Collection = require('../models/Collection.model');
const User = require('../models/User.model');


router.post('/items', async (req, res, next) => {
	try {
		// Retrieve the item data from the request body
		const { name, description, imageUrl, createdBy, categories, collections } = req.body;

		const categoryArray = await Category.find({ category: { $in: categories } });

		// Do some validation on the input data
		if (!name) {
			res.status(400).json({ message: 'Please provide all the required fields.' });
			return;
		}

		// Create the new item
		let newItem = await Item.create({
			name,
			description,
			imageUrl,
			createdBy,
			categories: categoryArray,
			collections,
		})



		// Update the collections with the new item
		await Collection.updateMany(
			{ _id: { $in: collections } },
			{ $push: { items: newItem } },
			{ new: true }
		);


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
		const items = await Item.find({}).populate('categories').populate('collections').populate('createdBy');

		// Send back a success response with the items
		res.status(200).json({ items });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

//get one item

router.get('/items/:id', async (req, res, next) => {
	try {
		// Retrieve the item id from the request params
		const { id } = req.params;

		// Retrieve the item details from the database

		const item = await Item.findById(id).populate('categories').populate('collections').populate('createdBy');

		// Send back a success response with the item
		res.status(200).json({ item });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});


module.exports = router;
