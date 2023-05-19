const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");
const Item = require("../models/Item.model");




//THIS IS FOR ATLAS SEARCH



// router.get("/search", async (req, res, next) => {
//     try {
//         const { search } = req.query;
//         let collections;
//         let items;
//         let users;

//         if (search) {
//           console.log("SEARCHING FOR: ", search)
//             collections = await Collection.aggregate([{
//                 '$search': {
//                   'index': 'CollectionSearchIndex',
//                   'text': {
//                     'query': search,
//                     'path': 'name'
//                   }
//                 }
//               }, {
//                 '$limit': 3
//               }
//             ]);

//             items = await Item.aggregate([
//                 {
//                   '$search': {
//                     'index': 'ItemSearchIndex',
//                     'text': {
//                       'query': search,
//                       'path': 'name'
//                     }
//                   }
//                 }, {
//                   '$limit': 3
//                 }, {
//                   '$project': {
//                     '_id': 1,
//                     'name': 1,
//                     'imageUrl': 1
//                   }
//                 }
//               ]);

//             users = await User.aggregate([
//                 {
//                   '$search': {
//                     'index': 'UserSearchIndex',
//                     'text': {
//                       'query': search,
//                       'path': 'username'
//                     }
//                   }
//                 }, {
//                   '$limit': 3
//                 }, {
//                   '$project': {
//                     '_id': 1,
//                     'username': 1,
//                     'imageUrl': 1
//                   }
//                 }
//               ]);


//         } else {
//             collections = await Collection.find().sort({ name: 'asc' }).limit(10);
//             items = await Item.find().sort({ name: 'asc' }).limit(10);
//         }

//         res.status(200).json({ collections, items, users });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//         next(error);
//     }
// });



//THIS IS FOR LOCAL SEARCH




router.get("/search", async (req, res, next) => {
  try {
    const { search } = req.query;
    let collections;
    let items;
    let users;

    if (search) {
      console.log("SEARCHING FOR: ", search);

      collections = await Collection.find({ $text: { $search: search } })
        .limit(3)
        .select("name");

      items = await Item.find({ $text: { $search: search } })
        .limit(3)
        .select("_id name imageUrl");

      users = await User.find({ $text: { $search: search } })
        .limit(3)
        .select("_id username imageUrl");
    } else {
      collections = await Collection.find().sort({ name: "asc" }).limit(10);
      items = await Item.find().sort({ name: "asc" }).limit(10);
    }

    res.status(200).json({ collections, items, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
});








  module.exports = router;
