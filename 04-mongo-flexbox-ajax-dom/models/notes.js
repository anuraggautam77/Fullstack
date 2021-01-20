
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
const NoteSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  DateOfCreation: { type: Date, default: Date.now },
  completestatus: { type: Boolean, default: false },
});

// Export the Model
module.exports = mongoose.model('notes', NoteSchema);
