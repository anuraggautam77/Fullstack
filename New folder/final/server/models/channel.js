const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const ChannelSchema = new Schema(
	{
		id: { type: Schema.Types.ObjectId},
		channelId: { type: String, required: true },
		title: { type: String, required: true },
		members: { type: [ { type: Schema.Types.ObjectId, ref: 'User' } ] }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Channel', ChannelSchema);
