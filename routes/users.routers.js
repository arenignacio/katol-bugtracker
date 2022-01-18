//#dependencies
const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

//#imports
const User = require('../models/User');

//#initializers
const users = express.Router();

//#middlewares
const registerUser = require('../utils/middleware/registerUser');

//#utility functions

users
	.route('/register')
	.post(
		body('email', 'Invalid email').isEmpty().trim().escape().toLowerCase(),
		body('username').isAlphanumeric(),
		registerUser
	);

users.route('/update').put((req, res) => {
	const { _id } = req.user;
	const { body } = req;
	let confirmation = 'User successfully updated';

	console.log(`id is ${_id}`);

	User.findByIdAndUpdate(_id, body, (err) => {
		if (err) confirmation = 'Invalid ID';

		res.json(confirmation);
	});
});

users.route('/:id').delete((req, res) => {
	const { id } = req.params;
	let confirmation = 'User successfully deleted';
	const curUser = req.user;

	if (curUser._id === id || curUser.role === 'admin') {
		User.findByIdAndDelete(id, null, (err) => {
			if (err) confirmation = 'Invalid ID';

			res.json(confirmation);
		});
	} else {
		res.status(401).json({ message: 'Unauthorized action' });
	}
});

users.route('/query').get(async (req, res) => {
	const { body } = req;
	let result = await User.where(body);

	res.json(result);
});

users.route('/login').post(
	(req, res, next) => {
		console.log('logging in...');
		next();
	},
	passport.authenticate('local', {
		failureFlash: true,
	}),

	(req, res) => {
		if (req.user && req.session.passport) {
			console.log('successfully logged in');
			const {
				firstname,
				username,
				lastname,
				email,
				phone,
				location,
				aboutme,
			} = req.user;

			res.status(200).json({
				username,
				firstname,
				lastname,
				email,
				phone,
				location,
				aboutme,
			});
		} else {
			console.log('user login fail');
			res.status(401).json('bad');
		}
		console.log(`safety net ran: ` + req.session);
		res.end();
	}
);

users.route('/logout').get((req, res) => {
	req.logout();
	console.log('loging out. user is now ' + req.user);
	res.end();
});

users.route('/amIloggedIn').get((req, res) => {
	const user = req.user;

	if (user) res.json(true);
	else res.json(false);
});

users.route('/myinfo').get((req, res) => {
	console.log('my info executes');

	if (req.user) {
		const { firstname, username, lastname, email, phone, location, aboutme } =
			req.user;

		console.log(
			'user is ' +
				{
					username,
					firstname,
					lastname,
					email,
					phone,
					location,
					aboutme,
				}
		);

		res.status(200).json({
			username,
			firstname,
			lastname,
			email,
			phone,
			location,
			aboutme,
		});
	} else res.status(401).json('no user found');
});

module.exports = users;
