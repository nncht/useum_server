const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
