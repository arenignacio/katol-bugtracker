const express = require('express');
const Project = require('../models/Project');

const Router = express.Router();

Router.route('/create-project').post((req, res) => {
	const { body } = req;

	Project.create(body, (err) => {
		if (err) res.send(err.message);
		else res.send('Project successfully created');
	});
});

Router.route('/query').get(async (req, res) => {
	const { body } = req;
	let result;

	try {
		result = await Project.where(body);
		if (result.length < 1) result = 'No data found';
	} catch (err) {
		result = err.message;
	}

	res.json(result);
});

module.exports = Router;
