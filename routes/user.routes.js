const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Collection = require('../models/Collection.model');
const Category = require('../models/Category.model');
const Item = require('../models/Item.model');
const Comment = require('../models/Comment.model');
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

		const user = await User.findOne({ username }).populate('collections').populate('categories').populate('comments').populate('items');

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
		const { password } = req.body;

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
				message: `User with ${_id} is removed successfully. Redirecting ... `,
				confirm: true,
			});
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

// Follow user

router.post('/:_userId/follow/:_followedUserId', async (req, res) => {
	try {
		// get the currently logged in user
		const user = await User.findById(req.params._userId);
		// set the user to be followed
		const followedUser = await User.findById(req.params._followedUserId);
		if (!followedUser) return res.status(404).send({ error: 'User not found' });
		// add the followedUser id to the  user's following array
		user.following.push(followedUser._id);
		// add the user id to followedUser's followers array
		followedUser.followers.push(user._id);
		await Promise.all([user.save(), followedUser.save()]);
		res.send({ message: `You are now following ${followedUser.username}` });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: 'Server error' });
	}
});

// Unfollow user
router.post('/:_userId/unfollow/:_followedUserId', async (req, res) => {
	try {
		// get the currently logged in user
		const user = await User.findById(req.params._userId);
		// set the user to be unfollowed
		const followedUser = await User.findById(req.params._followedUserId);
		if (!followedUser) return res.status(404).send({ error: 'User not found' });
		// remove the followedUser id from user's following array
		user.following = user.following.filter(
			(followedUserId) => followedUserId.toString() !== followedUser._id.toString()
		);
		// remove the user id from followedUser's followers array
		followedUser.followers = followedUser.followers.filter(
			(followerId) => followerId.toString() !== user._id.toString()
		);
		await Promise.all([user.save(), followedUser.save()]);
		res.send({ message: `You have unfollowed ${followedUser.username}` });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: 'Server error' });
	}
});

// routes for the function of enabling users to LIKE stuff

router.post('/:_id/like/:thingId', async (req, res, next) => {
	try {
		const { _id, thingId } = req.params;

		const currentUser = await User.findById(_id)
		currentUser.likes.push(thingId);
		await currentUser.save();

		const item = await Item.findById(thingId);
    if (item) {
		item.likes.push(currentUser._id);
		await item.save();
	} else { console.log("the id does not belong to an item!") }

	  const collection = await Collection.findById(thingId);
    if (collection) {
		collection.likes.push(currentUser._id);
		await collection.save();

	} else { console.log("the id does not belong to a collection!") }

		res.status(200).json(currentUser);


	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

router.post('/:_id/unlike/:thingId', async (req, res, next) => {
	try {
		const { _id, thingId } = req.params;

		const currentUser = await User.findById(_id);

		currentUser.likes = currentUser.likes.filter((like) => like.toString() !== thingId);

		await currentUser.save();

		const item = await Item.findById(thingId);
		if (item) {
			item.likes = item.likes.filter((like) => like.toString() !== currentUser._id.toString());
			await item.save();
		} else {
			console.log('the id does not belong to an item!');
		}

		const collection = await Collection.findById(thingId);
		if (collection) {
			collection.likes = collection.likes.filter(
				(like) => like.toString() !== currentUser._id.toString()
			);
			await collection.save();
		} else {
			console.log('the id does not belong to a collection!');
		}




		res.status(200).json(currentUser);
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});






















// Get user with populated followers and users this user is following
router.get('/users/:username/follow', async (req, res, next) => {
	try {
		const { username } = req.params;

		const user = await User.findOne({ username }).populate('followers').populate('following');

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




router.get('/likes/:_id', async (req, res, next) => {
	try {
	  const { _id } = req.params;

	  if (!mongoose.Types.ObjectId.isValid(_id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	  }

	  const user = await User.findById(_id)

	  const itemLikes = await Item.find({ _id: { $in: user.likes } });
	  const collectionLikes = await Collection.find({ _id: { $in: user.likes } });


	  res.status(200).json({ itemLikes, collectionLikes });


	} catch (error) {

	  if (error instanceof mongoose.Error.CastError) {
		  res.json({ message: 'ID not found for Model, trying other Model' });
		  } else {


	  res.status(500).json({ message: 'Internal Server Error' });
	  next(error);
	} }
  });

















module.exports = router;
