const { Schema, model } = require("mongoose");
const Category = require("./Category.model");
const Collection = require("./Collection.model");
const Item = require("./Item.model");
const Comment = require("./Comment.model");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
    },

    userbio: {
      type: String,
      maxlength: 2000,
    },

    pronouns: {
      type: String,
    },

    imageUrl: {
      type: String,
      default: "/images/default/default-profile.png",
    },

    headerImageUrl: {
      type: String,
      default: "/images/default/default-header.svg",
    },

    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);


const User = model("User", userSchema);

const MONGO_URI =
   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server";

async function run() {
  await mongoose.connect(MONGO_URI);
  await User.findOne(); // Works!
  console.log("Found the User Model")
}

run()

module.exports = User;
