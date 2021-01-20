const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		createdBy: {type: String, required: true },
		createdAt: {type: String, required: true },
		messageId: {type: String, required: true },
		message: { type: String, required: true },
		channelId: { type: Schema.Types.ObjectId, ref: 'Channel' }
	},
	{
		timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
	}
);

module.exports = mongoose.model('Message', MessageSchema);
