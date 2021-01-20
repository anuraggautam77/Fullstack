const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Schema defines how the user data will be stored in MongoDB
const UserSchema = new Schema({
	password: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	gittoken: { type: String },
	gituser: { type: String },
	logintype: { type: String }
});

// Export the Model
module.exports = mongoose.model('User', UserSchema);
