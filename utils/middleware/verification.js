const Project = require('../../models/Project');

//verify user is member of project
module.exports.isMember = async (req, res, next) => {
	try {
		const id = req.body.project ? req.body.project : req.params.id;
		const project = await Project.findById(id);
		const members = project.members.map((member) => {
			return member.email;
		});

		if (!members.includes(req.user.email)) {
			console.log('unauthorized access');
			res.status(403).json('Unauthorized action');
		} else {
			next();
		}
	} catch (err) {
		console.log(err.message);
		res.json(err.message);
	}
};

//verify user is pm
module.exports.isManager = async (req, res, next) => {
	try {
		const { id } = req.params;
		const project = await Project.findById(id);
		const managers = project.project_manager.map((manager) => {
			return manager.email;
		});

		if (!managers.includes(req.user.email)) {
			console.log('unauthorized access');
			res.status(403).json('Unauthorized action');
		} else {
			next();
		}
	} catch (err) {
		console.log(err.message);
		res.json(err.message);
	}
};
