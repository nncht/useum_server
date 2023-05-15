const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User.model');
const Collection = require('../models/Collection.model');
const Item = require('../models/Item.model');

router.post('/:userId/bookmark/:bookmarkId', async (req, res, next) => {
  try {
    const { userId, bookmarkId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookmarkId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    const currentUser = await User.findById(userId);

    if (!currentUser.bookmarks.includes(bookmarkId)) {
        currentUser.bookmarks.push(bookmarkId);
        await currentUser.save();


      res.status(200).json(currentUser);
    } else {
      res.json({ message: 'This item is already bookmarked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
});


router.post('/:userId/unbookmark/:bookmarkId', async (req, res, next) => {
  try {
    const { userId, bookmarkId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookmarkId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    const currentUser = await User.findById(userId);

    currentUser.bookmarks = currentUser.bookmarks.filter((bookmark) => bookmark.toString() !== bookmarkId);

    await currentUser.save();

    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
});

router.get('/bookmarks/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    const user = await User.findById(_id)

    const itemBookmarks = await Item.find({ _id: { $in: user.bookmarks } });
    const collectionBookmarks = await Collection.find({ _id: { $in: user.bookmarks } });


    res.status(200).json({ itemBookmarks, collectionBookmarks });


  } catch (error) {

    if (error instanceof mongoose.Error.CastError) {
        res.json({ message: 'ID not found for Model, trying other Model' });
        } else {


    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  } }
});



module.exports = router;
