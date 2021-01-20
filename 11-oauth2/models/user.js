const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
const UserSchema = new Schema({
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: String,
  logintype: String,
});

// Export the Model
module.exports = mongoose.model('User', UserSchema);
