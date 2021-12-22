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

Router.route('/query').get((req, res) => {});

module.exports = Router;
