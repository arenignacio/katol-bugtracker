const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	phone: String,
	location: String,
	online: {
		type: Boolean,
		default: false,
	},
	status: String,
	aboutme: String,
	disabled: {
		type: Boolean,
		default: false,
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
	role: { type: String, default: 'Software Engineer' },
});

module.exports = mongoose.model('User', userSchema);
