const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
const BoardSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  DateOfCreation: { type: Date, default: Date.now },
  completestatus: { type: Boolean, default: false },
});
module.exports = mongoose.model('boards', BoardSchema);
