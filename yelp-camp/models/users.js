const mongoose              = require('mongoose'),
      passportLocalMongoose = require("passport-local-mongoose");

/////// USER SCHEMA AND MODEL ///////

const Schema = mongoose.Schema;
// Define the user keys and key types
const UserSchema = new Schema({
   username: String,
   password: String
});

// add passport plugin for mongoose
UserSchema.plugin(passportLocalMongoose);

// set the database model
module.exports = mongoose.model('Users',UserSchema);
