const Project = require('../../models/Project');

//verify user is member of project
module.exports.isMember = async (req, res, next) => {
	try {
		const { id } = req.params;
		const project = await Project.findById(id);
		const members = project.members.map((member) => {
			return member.email;
		});

		console.log('verification: ', members);
	} catch (err) {
		console.log(err);
	}

	next();
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
		}
	} catch (err) {
		console.log(err.message);
		res.json(err.message);
	}

	next();
};
