const { Schema, model } = require("mongoose");


const Collection = require('./Collection.model');
const Comment = require('./Comment.model');
const User = require('./User.model');
const Category = require('./Category.model');
const mongoose = require("mongoose");

const itemSchema = new Schema(
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
      default: "/images/default/default-item.svg",
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

const MONGO_URI =
   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server";

async function run() {
  await mongoose.connect(MONGO_URI);
  await Item.findOne(); // Works!
  console.log("Found the Item Model")
}

run()

module.exports = Item;
