const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Collection = require('../models/Collection.model');
const Category = require('../models/Category.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/users', async (req, res, next) => {
	try {
		const users = await User.find();

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

// I've uncommented the route below because we're using usernames instead of IDs now.
// Leaving it in the code for now in case we still need any of it elsewhere.

// router.get("/users/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       res.status(400).json({ message: "Specified id is not valid" });
//       return;
//     }

//     const user = await User.findById(id)
//       .populate("collections")
//       .populate("categories");
//     console.log(user);

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//     next(error);
//   }
// });

router.get('/users/:username', async (req, res, next) => {
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

router.put('/users/:_id', async (req, res, next) => {
	try {
		const { _id } = req.params;
		const { email, password, username, imageUrl, headerImageUrl, userbio, pronouns, categories } = req.body;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			res.status(400).json({ message: 'Specified id is not valid' });
			return;
		}

		const categoryArray = await Category.find({ category: { $in: categories } });

		const updateUser = await User.findByIdAndUpdate(
			_id,
			{ email, password, username, imageUrl, headerImageUrl, userbio, pronouns, categories: categoryArray },
			{ new: true }
		);

		res.status(200).json(updateUser);
	} catch (error) {
		if (error.code === 11000) {
			res.status(500).json({
				message: 'Username and email need to be unique. Either username or email is already used.',
			});
		} else {
			res.status(500).json({ message: 'Internal Server Error' });
		}
		next(error);
	}
});

// change password route

router.put('/users/:_id/change-password', async (req, res, next) => {
	try {
		const { _id } = req.params;
		const { password, newPassword, confirmPassword } = req.body;

		if (password === '' || newPassword === '') {
			res.json({ message: 'Please fill in all fields' });
			return;
		}

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			res.json({ message: 'Specified id is not valid' });
			return;
		}

		const foundUser = await User.findById(_id);

		if (!foundUser) {
			res.json({ message: 'User not found' });
			return;
		}

		// check if the password is correct

		const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
		console.log('Password is Correct', isPasswordCorrect);

		if (!isPasswordCorrect) {
			res.json({ message: 'Password invalid' });
			return;
		}

		// Use regex to validate the password format
		const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?\-]).{8,}/;
		if (!passwordRegex.test(newPassword)) {
			res.json({
				message:
					'Password must have at least 8 characters and contain at least one number, one lowercase and one uppercase letter.',
			});
		}

		// hash the new password

		if (password === newPassword) {
			res.json({
				message: 'New password cannot be the same as the old password.',
			});
			return;
		}

		if (newPassword !== confirmPassword) {
			res.json({
				message: 'New password and confirm password do not match.',
			});
			return;
		}

		if (passwordRegex.test(newPassword)) {
			const salt = bcrypt.genSaltSync(10);
			const newHashedPassword = bcrypt.hashSync(newPassword, salt);

			// update the user with the new password

			const updateUser = await User.findByIdAndUpdate(_id, { password: newHashedPassword }, { new: true });

			res.status(200).json({ message: 'Password updated successfully, redirecting ... ', confirm: true });
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

router.post('/users/:_id/delete', async (req, res, next) => {
	try {
		const { _id } = req.params;
    const {password} = req.body

		if (password === '') {
			res.json({ message: 'Please fill in all fields' });
			return;
		}

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			res.json({ message: 'Specified id is not valid' });
			return;
		}

		const foundUser = await User.findById(_id);

		if (!foundUser) {
			res.json({ message: 'User not found' });
			return;
		}

    // check if the password is correct

    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
    console.log('Password is Correct', isPasswordCorrect);

    if (!isPasswordCorrect) {
      res.json({ message: 'Password invalid' });
      return;
    } else {

      await User.findByIdAndDelete(_id);

		res.status(200).json({
			message: `User with ${_id} is removed successfully. Redirecting ... `, confirm: true
		}); }







	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

module.exports = router;
