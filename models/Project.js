const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: String,
	project_manager: {
		id: { type: String, required: true },
		name: { type: String, required: true },
	},
	members: [{ id: String, name: String }],
});

module.exports = mongoose.model('Project', projectSchema);
