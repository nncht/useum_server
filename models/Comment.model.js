const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CommentSchema = new Schema(
  {
    title: {
      type: String,
      // required: [true, 'Title is required.'],
      unique: false,
    },
    body: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", CommentSchema);

const MONGO_URI =
   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server";

async function run() {
  await mongoose.connect(MONGO_URI);
  await Comment.findOne(); // Works!
  console.log("Found the Comment Model")
}

run()

module.exports = Comment;
