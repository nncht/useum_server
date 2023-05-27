const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String
  }
});

const Category = mongoose.model('Category', categorySchema);

const MONGO_URI =
   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/association_server";

async function run() {
  await mongoose.connect(MONGO_URI);
  await Category.findOne(); // Works!
  console.log("Found the Category Model")
}

run()

module.exports = Category;