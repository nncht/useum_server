const { Schema, model } = require("mongoose");

const Collection = require('./Collection.model');
const Review = require('./Review.model');
const User = require('./User.model');
const Category = require('./Category.model');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      default:"No image"
    },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    collections: [{
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    }],
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }




  },
  {
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
