const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {

  },
  {
    timestamps: true
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
