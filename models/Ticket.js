const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
	subject: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String, default: 'initiated' }, //initiated, open, in progress, resolved, cancelled
	priority: { type: String, default: 'normal' }, //'low', 'normal', 'high'
	type: { type: String, required: true },
	comments: [
		{
			_id: { type: String, default: new mongoose.Types.ObjectId() },
			author_id: { type: String, required: true },
			author: { type: String, required: true },
			date: { type: Date, default: new Date() },
			content: { type: String, required: true },
		},
	],
	initiated_by: {
		id: { type: String, required: true, immutable: true },
		name: { type: String, required: true, immutable: true },
	},
	assigned_to: {
		id: { type: String /* , required: true  */ },
		name: { type: String /* , required: true  */ },
	},
	date_initiated: { type: Date, default: new Date(), immutable: true },
	last_updated: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Ticket', ticketSchema);
