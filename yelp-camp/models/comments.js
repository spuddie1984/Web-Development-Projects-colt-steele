const mongoose = require('mongoose');

/////// COMMENTS SCHEMA AND MODEL ///////

const Schema = mongoose.Schema;
// Define the campgroundSchema keys and key types
const commentsSchema = new Schema({
   author: String,
   text: String,
});
// set the database model
module.exports = mongoose.model('Comments', commentsSchema);