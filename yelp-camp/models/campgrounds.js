const mongoose = require('mongoose');

/////// CAMPGROUNDS SCHEMA AND MODEL ///////

const Schema = mongoose.Schema;
// Define the campgroundSchema keys and key types
const campgroundSchema = new Schema({
   name: String,
   image: String,
   price: Number,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Users"
      },
      username: String,
   },
   comment: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
   }]
});
// set the database model
module.exports = mongoose.model('Campgrounds',campgroundSchema);
