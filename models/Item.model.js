const { Schema, model } = require("mongoose");

const categoryEnum = require('../services/categoryEnum');

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
    image: {
      type: String,
      default:"No image"
    },
    category: {
      type: String,
      enum: Object.values(categoryEnum),
    required: true,




  },
  {
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
