const { Schema, model } = require("mongoose");

const User = require('./User.model');
const Item = require('./Item.model');
const Review = require('./Review.model');
const Category = require('./Category.model');



const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String,
      default:"No image"
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    items: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }],
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    sharedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],


  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
