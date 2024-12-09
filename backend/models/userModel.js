const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, 'Please add a username']
   },
   email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'Please add a password']
   }
});

const UserModel = mongoose.model('User', UserSchema); // 'users' is the name of the collection

module.exports = UserModel;