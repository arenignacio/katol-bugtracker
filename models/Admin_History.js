const mongoose = require('mongoose');

const adminHistorySchema = mongoose.Schema({
	author: { username: String, required: true, immutable: true },
	date: { type: Date, immutable: true },
	action: String,
});

module.exports = mongoose.model('Admin-History', adminHistorySchema);
