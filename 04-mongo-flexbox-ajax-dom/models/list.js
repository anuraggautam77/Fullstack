const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
const ListSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  DateOfCreation: { type: Date, default: Date.now },
  Boardid: { type: String, required: true },
  carrdtype: { type: String, default: 'todo' },
});

// Export the Model
module.exports = mongoose.model('lists', ListSchema);
