const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fileUploader = require("../config/cloudinary.config");
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');


router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
	 console.log("file is: ", req.file)

	if (!req.file) {
	  next(new Error("No file uploaded!"));
	  return;
	}

	// Get the URL of the uploaded file and send it as a response.
	// 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

	res.json({ fileUrl: req.file.path });
  });


router.get('/users', async (req, res, next) => {
	try {
		const users = await User.find();

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

router.put('/users/:_id', async (req, res, next) => {
	try {
		const { _id } = req.params;
		const { email, password, username } = req.body;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			res.status(400).json({ message: 'Specified id is not valid' });
			return;
		}

		const updateUser = await User.findByIdAndUpdate(_id, { email, password, username }, { new: true });

		res.status(200).json(updateUser);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

router.delete('/users/:_id', async (req, res, next) => {
	try {
		const { _id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			res.status(400).json({ message: 'Specified id is not valid' });
			return;
		}

		await User.findByIdAndDelete(_id);
		res.status(200).json({
			message: `User with ${_id} is removed successfully.`,
		});
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

module.exports = router;
