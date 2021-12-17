const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	firstname: String,
	lastname: String,
	email: { type: String, required: true },
	phone: String,
	status: {
		type: String,
		default: 'active',
	},
	settings: {
		notifications: { type: Boolean, default: true },
	},
	notifications: [
		{
			from: String,
			message: String,
		},
	],
	role: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
