const mongoose = require('mongoose');

const ticketHistorySchema = mongoose.Schema({
	ticketID: { type: String, required: true, immutable: true },
	author: { username: String, required: true, immutable: true },
	date: { type: Date, default: new Date(), required: true, immutable: true },
	action: { type: String, required: true },
});

module.exports = mongoose.model('Ticket-History', ticketHistorySchema);
