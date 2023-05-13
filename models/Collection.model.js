const { Schema, model } = require("mongoose");

const User = require('./User.model');
const Item = require('./Item.model');
const Comment = require('./Comment.model');
const Category = require('./Category.model');



const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
    },
    description: {
      type: String,
    },

    imageUrl: {
      type: String,
      default: "/images/default/default-collection.svg",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    
    items: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: [{
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
    timestamps: true,
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
