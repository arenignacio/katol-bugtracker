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

users.route('/:id').put((req, res) => {
	const { id } = req.params;
	const { body } = req;
	let confirmation = 'User successfully updated';

	User.findByIdAndUpdate(id, body, (err) => {
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
			res.status(200).json({
				firstname: req.user.firstname,
				lastname: req.user.lastname,
				username: req.user.username,
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
		console.log('user is ' + req.user.email);
		res.json(req.user);
	} else res.status(401).json('no user found');
});

module.exports = users;
