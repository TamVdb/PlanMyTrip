const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   name: String,
   description: String,
   location: String,
   startDate: String,
   endDate: String,
   days: Number,
   isChecked: {
      type: Boolean,
      default: false
   }
});

const TripModel = mongoose.model('Trip', TripSchema);

module.exports = TripModel;