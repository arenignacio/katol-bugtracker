const express = require('express');
const Project = require('../models/Project');

const Router = express.Router();

//new project
Router.route('/new').post((req, res) => {
	const input = req.body;

	Project.create(input, (err) => {
		if (err) res.send(err.message);
		else res.send('Project successfully created');
	});
});

//get project/s, update project
Router.route('/:id?')
	.get(async (req, res) => {
		const id = req.params.id;
		let result;

		try {
			result = id ? await Project.where({ _id: id }) : await Project.find();
		} catch (err) {
			result = 'err: ' + err.message;
		}

		res.json(result);
	})
	.put(async (req, res) => {
		const id = req.params.id;
		const body = req.body;
		/* const { email } = req.user;  
			#needs req.user access
		*/
		let result;

		try {
			const selectedProject = await Project.findById(id);
			const isAuthorized = selectedProject.project_manager.some(
				(el) => el.email === req.user.email
			);

			if (isAuthorized) {
				Project.findByIdAndUpdate(id, body, (err, res) => {
					if (err) result = 'err' + err.message;
				});
				res.status(200);
				result = 'successfully updated';
			} else {
				res.status(403);
				result = 'unauthorized user';
			}
		} catch (err) {
			res.status(404);
			result = 'err: ' + err.message;
		}

		res.json(result);
	});

module.exports = Router;
