const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
const CardSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  DateOfCreation: { type: Date, default: Date.now },
  Boardid: { type: String, required: true },
  Listid: { type: String, required: true },
});
module.exports = mongoose.model('cards', CardSchema);
