const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
const BoardSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  DateOfCreation: { type: Date, default: Date.now },
  completestatus: { type: Boolean, default: false },
  createdby: { type: mongoose.Schema.ObjectId, required: true, ref: User },
  userBelongs: [{ type: mongoose.Schema.ObjectId, ref: User }],
});
module.exports = mongoose.model('boards', BoardSchema);


 