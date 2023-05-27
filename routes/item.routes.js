const { isAuthenticated } = require('../middleware/jwt.middleware');
const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model');
const Category = require('../models/Category.model');
const Collection = require('../models/Collection.model');
const Comment = require('../models/Comment.model');
const User = require('../models/User.model');

router.post('/items', async (req, res, next) => {
	try {
		// Retrieve the item data from the request body
		const { name, description, imageUrl, createdBy, categories, collections, commentTitle, comment, currentUser } =
			req.body;

		console.log('Item created by: ', createdBy);

		console.log('Comment made on this item:', comment);

		const categoryArray = await Category.find({
			category: { $in: categories },
		});

		const userComment = await Comment.create({
			title: commentTitle,
			body: comment,
			user: createdBy,
		});

		const userCommentArray = [userComment._id];

		// Do some validation on the input data
		if (!name) {
			res.status(400).json({ message: 'Please provide all the required fields.' });
			return;
		}



		// //Create a free item (meaning not attached to a collection from the start)
		// //if comment is an empty string, leave the comments array empty
		// if (collections === '' && comment === '') {
		// 	const newFreeItem = await Item.create({
		// 		name,
		// 		description,
		// 		imageUrl,
		// 		createdBy,
		// 		categories: categoryArray,
		// 		// comments: [],
		// 	});

		// 	//update the users "items" array with the new item
		// 	await User.findByIdAndUpdate(createdBy, {
		// 		$push: { items: newFreeItem._id},
		// 	}).populate('items');


		// 	res.status(201).json({ item: newFreeItem  });
		// }

		//Create an item that is attached to a collection from the start

		let newItem;

		if (imageUrl !== '') {
			//if the user has chosen an image, use that image
			newItem = await Item.create({
				name,
				description,
				imageUrl,
				createdBy,
				categories: categoryArray,
				collections,
				// comments: [userComment._id],
			});
		} else {
			//if the user has not chosen an image, use the default image
			newItem = await Item.create({
				name,
				description,
				createdBy,
				categories: categoryArray,
				collections,
				// comments: [userComment._id],
			});
		}

		const populatedUserComment = await Comment.findById(userComment._id).populate('user');

		//Update the item'S "comments" array with the comment
		if (comment !== '') {
			await Item.findByIdAndUpdate(newItem._id, { $push: { comments: populatedUserComment } }, { new: true }).populate(
				'comments'
			);
		}

		// Update the collections "items" array with the new item
		await Collection.updateMany({ _id: { $in: collections } }, { $push: { items: newItem } }, { new: true }).populate(
			'items'
		);

		//update the users "items" array with the new item
		await User.findByIdAndUpdate(createdBy, {
			$push: { items: newItem._id, comments: userComment._id },
		}).populate('items').populate('comments');



		//update the newly added item with the current Users ID in the item's "users" array
		await Item.findByIdAndUpdate(newItem._id, { $push: { users: currentUser._id } }, { new: true }).populate('users');


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

		const items = await Item.find({}).populate('categories').populate('collections').populate('createdBy').populate('comments').populate('likes');



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

		const item = await Item.findById(id)
			.populate('categories')
			.populate('collections')
			.populate('createdBy')
			.populate('comments')
			.populate('users');

		const itemComments = await Item.findById(id).populate('comments');

		let populatedComments = [];

		for (const comment of itemComments.comments) {
			const theComments = await Comment.findById(comment._id).populate('user');
			populatedComments.push(theComments);
		}

		// Send back a success response with the item
		res.status(200).json({ item: item, comments: populatedComments });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

router.put('/items/:id/edit', async (req, res, next) => {
	const { id } = req.params;
	const { name, description, imageUrl, createdBy, categories, comment, commentTitle, currentUserId } = req.body;

	try {
		const categoryArray = await Category.find({
			category: { $in: categories },
		});

		// make an array of all this items comments

		const itemComments = await Item.findById(id).populate('comments');


		if (itemComments.comments.length === 0) {
			const newComment = await Comment.create({
				title: commentTitle,
				body: comment,
				user: currentUserId,
			});


			const item = await Item.findByIdAndUpdate(
				id,
				{ name, description, imageUrl, categories: categoryArray, $push: { comments: newComment } },
				{ new: true }
			);
			res.status(200).json(item);
		} else {
			//see if the users ID is in this specific item's "comments" array

			async function updateItemWithComment(currentUserId, itemComments) {
				let commentToUpdateId = null;

				itemComments.comments.forEach((comment) => {
					if (comment.user._id.toString() === currentUserId) {
						commentToUpdateId = comment._id;
						return; // Exit the loop after finding the matching comment
					}
				});

				if (commentToUpdateId) {
					await Comment.findByIdAndUpdate(
						commentToUpdateId,
						{
							title: commentTitle,
							body: comment,
						},
						{ new: true }
					);

					const item = await Item.findByIdAndUpdate(
						id,
						{ name, description, imageUrl, categories: categoryArray },
						{ new: true }
					);

					return item

				} else {

					const newComment = await Comment.create({
						title: commentTitle,
						body: comment,
						user: currentUserId,
					});

					const populatedUserComment = await Comment.findById(newComment._id).populate('user');

					let item;

					if (populatedUserComment !== '') {

						item = await Item.findByIdAndUpdate(id, { $push: { comments: populatedUserComment } }, { new: true }).populate(
							'comments'
						);
					}

				return item;
				}
			}

			const item = await updateItemWithComment(currentUserId, itemComments);

			res.status(200).json(item);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});

router.post('/items/:id', async (req, res, next) => {
	const { id } = req.params;
	const { createdBy, collection, currentUser } = req.body;

	try {
		//find the item in question

		const itemInQuestion = await Item.findById(id).populate('comments');

		async function deleteComment(currentUser, id, itemInQuestion) {
			const commentToDelete = itemInQuestion.comments.find((comment) => {
				return comment.user == currentUser;
			});

			if (commentToDelete) {
				console.log('Deleting the comment', commentToDelete);
				// Delete the comment from the database
				await Item.findByIdAndUpdate(id, { $pull: { comments: commentToDelete._id } }, { new: true });
				await User.findByIdAndUpdate(currentUser, { $pull: { comments: commentToDelete._id } }, { new: true });
			} else {
				console.log('No comment to delete');
			}
		}

		deleteComment(currentUser, id, itemInQuestion);

		//Take the item out of the user's items array
		// Delete the item from the database
		await User.findByIdAndUpdate(currentUser, { $pull: { items: id } });

		//pull the user from items user array

		await Item.findByIdAndUpdate(id, { $pull: { users: currentUser } });

		// Delete item from the current collection
		await Collection.findByIdAndUpdate(collection, { $pull: { items: id } });

		await Item.findByIdAndUpdate(id, { $pull: { collections: collection } }, { new: true });

		res.status(200).json({ message: 'Item deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});



// add a comment in the add-item modal

router.put('/items/:id/comment', async (req, res, next) => {
	const { id } = req.params;
	const { comment, currentUserId } = req.body;

	try {
		const newComment = await Comment.create({

			body: comment,
			user: currentUserId,
		});


		const newlyAddedItem = await Item.findByIdAndUpdate(
			id,
			{ $push: { comments: newComment } },
			{ new: true }
		);

		res.status(200).json(newlyAddedItem);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
		next(error);
	}
});











module.exports = router;
