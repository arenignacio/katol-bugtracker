const express = require('express');
const isMember = require('../utils/middleware/verification').isMember;
const isManager = require('../utils/middleware/verification').isManager;
const Project = require('../models/Project');
const User = require('../models/User');

const Router = express.Router();

//new project
Router.route('/new').post((req, res) => {
	const input = req.body;

	Project.create(input, (err) => {
		if (err) res.send(err.message);
		else res.send('Project successfully created');
	});
});

Router.route('/:id/members')
	.get(async (req, res) => {
		const { id } = req.params;

		console.log('get members executed');

		try {
			const project = await Project.findById(id);
			const members = project.members;
			res.json(members);
		} catch (err) {
			console.log(err);
			res.json(err.message);
		}
	})
	.put(isManager, async (req, res) => {
		console.log('put members executed');

		try {
			const { id } = req.params;
			const members = req.body.members;
			const project = await Project.findById(id);
			const allUsers = await User.find();
			const selectedUsers = allUsers.reduce(
				(acc, { email, firstname, lastname }) => {
					if (members.includes(email)) {
						acc.push({ email, name: `${firstname} ${lastname}` });
					}

					return acc;
				},
				[]
			);

			console.log('members: ', members);
			console.log('filtered users: ', selectedUsers);

			project.members = selectedUsers;
			project.save();

			res.json(project.members);
		} catch (err) {
			console.log(err.message);
			res.json(err.message);
		}
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
