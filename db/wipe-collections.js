const mongoose = require('mongoose');
const Collection = require('../models/Collection.model');

mongoose.connect('mongodb://127.0.0.1:27017/association_server', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to database!');
return Collection.deleteMany({});
})
.then((result) => {
console.log(`Deleted ${result.deletedCount} collections.`);
return mongoose.disconnect();
})
.then(() => {
console.log('Disconnected from database.');
})
.catch((error) => {
console.error('Error:', error);
});