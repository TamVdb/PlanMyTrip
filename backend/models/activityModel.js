const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
   trip: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Trip'
   },
   name: {
      type: String,
      required: [true, 'Please add a name']
   },
   location: String,
   duration: String,
   price: String,
   day: {
      type: Number,
      default: 0
   }
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);

module.exports = ActivityModel;