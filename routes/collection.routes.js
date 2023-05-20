const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");
const Item = require("../models/Item.model");

router.post("/collections", async (req, res, next) => {
  try {
    const { name, createdBy, description, imageUrl, categories } = req.body;
    if (!name) {
      res
        .status(400)
        .json({ message: "Please provide a name for the collection" });
      return;
    }

    const categoryArray = await Category.find({
      category: { $in: categories },
    });

    // If no collection image is chosen, replace empty string with default user image path

    if (imageUrl !== "") {
      const collection = await Collection.create({
        name,
        createdBy,
        description,
        imageUrl,
        categories: categoryArray,
      });

      await User.findByIdAndUpdate(createdBy, {
        $push: { collections: collection._id },
      });

      res.status(201).json({ collection });

      // Update the user's collections array
    } else {
      const collection = await Collection.create({
        name,
        createdBy,
        description,
        categories: categoryArray,
      });

      await User.findByIdAndUpdate(createdBy, {
        $push: { collections: collection._id },
      });

      res.status(201).json({ collection });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});

router.get("/collections", async (req, res, next) => {
  try {
    // Retrieve all the collections from the database
    const collections = await Collection.find({});

    // Send back a success response with the collections
    res.status(200).json({ collections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});

router.get("/collections/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const collection = await Collection.findById(id)
      .populate("categories")
      .populate("createdBy")
      .populate("items")
      .populate("likes");

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});

router.put("/collections/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, imageUrl, createdBy, categories } = req.body;

  try {
    const categoryArray = await Category.find({
      category: { $in: categories },
    });

    const collection = await Collection.findByIdAndUpdate(
      id,
      { name, description, imageUrl, categories: categoryArray },
      { new: true }
    );

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});

router.put("/collections/:id/add-item", async (req, res, next) => {
  const { id } = req.params;
  const { item, user } = req.body;

  try {
    //if item is already in collection, return error
    const collection = await Collection.findById(id);
    const itemExists = collection.items.includes(item);

    if (itemExists) {
      res.status(400).json({ message: "Item already exists in collection" });
      return;
    }

    const itemUpdateColl = await Item.findByIdAndUpdate(item, { $push: { collections: id } }, { new: true });
    const itemUpdateUser = await Item.findByIdAndUpdate(item, { $push: { users: user } }, { new: true });

      const collectionUpdate = await Collection.findByIdAndUpdate(
        id,
        { $push: { items: item } },
        { new: true }
      );



      res.status(200).json({Item: itemUpdateUser, Collection: collectionUpdate});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});

router.post("/collections/:id", async (req, res, next) => {
  const { id } = req.params;
  const { createdBy } = req.body;

  try {
    // Delete the collection from the database
    await User.findByIdAndUpdate(createdBy, { $pull: { collections: id } });

    await Collection.findByIdAndDelete(id);
    // Update the user's collections array

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});

module.exports = router;
