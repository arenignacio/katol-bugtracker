//#dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

//#imports
const User = require('../models/User');

//#initializers
const users = express.Router();

//#middlewares

//#utility functions
const capitalize = require('../utils/stringMutator');

users
	.route('/register')
	.post(
		body('email', 'Invalid email').isEmpty().trim().escape().toLowerCase(),
		body('username').isAlphanumeric(),
		(req, res, next) => {
			const { body } = req;
			const errors = validationResult(req);
			body.username = 'test123';

			console.log('registering..');

			bcrypt.hash(body.password, 10, async (err, hash) => {
				if (err) {
					console.log('encryption failed: ' + err.message);
					res.status(401).json(err.message);
				} else if (await User.exists({ email: body.email })) {
					console.log('registration failed: Account already exists');
					res.status(409).json('Account already exists');
				} else {
					console.log('creating user');
					body.password = hash;
					User.create(body, (err, user) => {
						if (err) {
							console.log('user creation failed: ' + err.message);
							res.json(err.message);
						} else {
							console.log('user successfully created. logging in..');
							req.login(user, (err) => {
								if (err) {
									console.login('failed login: ' + err.message);
									res.json(err.message);
								} else {
									console.log('logged in');
									res.json({
										firstname: capitalize(user.firstname),
										lastname: capitalize(user.lastname),
										username: user.username,
									});
								}
							});
						}
					});
				}
			});
		}
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
				firstname: capitalize(req.user.firstname),
				lastname: capitalize(req.user.lastname),
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
