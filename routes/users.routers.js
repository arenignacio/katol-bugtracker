//#modules
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

//#imports
const User = require('../models/User');

//#initializers
const users = express.Router();

//#middlewares

users.route('/register').post((req, res, next) => {
	const { body } = req;
	body.username = 'test123';

	bcrypt.hash(body.password, 10, async (err, hash) => {
		if (err) res.send(err.message);
		body.password = hash;

		if (!body.email) {
			console.log("email doesn't exist");
			res.status(401).json(
				'Account already exists. Please log in to continue.'
			);
		} else if (await User.exists({ email: body.email })) {
			console.log('this executes');
			res.status(409).json(
				'Account already exists. Please log in to continue.'
			);
		} else {
			User.create(body, (err, user) => {
				if (err) res.json(err);
				else {
					console.log('logging in');
					req.login(user, (err) => {
						if (err) res.json(err);
						else console.log('logged in');
						res.end();
					});
				}
			});
		}
	});
});

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
	passport.authenticate('local', {
		failureFlash: true,
	}),

	(req, res) => {
		if (req.user && req.session.passport) {
			console.log('successfully logged in');
			res.status(200).json('okay');
		} else {
			res.status(401).json('bad');
		}
		console.log(req.session);
		res.end();
	}
);

users.route('/logout').get((req, res) => {
	req.logout();
	console.log('logout. user exists? ' + req.user);
	res.end();
});

users.route('/amIloggedIn').get((req, res) => {
	const user = req.user;

	if (user) res.json(true);
	else res.json(false);
});

users.route('/myinfo').get((req, res) => {
	console.log('my info executes');
	res.json(req.user);
});

module.exports = users;
