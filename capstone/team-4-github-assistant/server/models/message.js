const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		userId: { type: String, ref: 'User' },
		senderId: { type: String, ref: 'User', required: true },
		createdBy: { type: String },
		createdAt: { type: String, required: true },
		messageId: { type: String, required: true },
		message: { type: String },
		channelId: { type: String, ref: 'Channel' },
		type: { type: String, required: true },
		subtype: { type: String },
		details: { type: Object, default: {} }
	
	},
	{
		timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
	}
);

module.exports = mongoose.model('Message', MessageSchema);
