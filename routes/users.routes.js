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
const verifyLogin = require('../utils/middleware/verifyLogin');

//#utility functions

//new user
users
	.route('/register')
	.post(
		body('email', 'Invalid email').isEmpty().trim().escape().toLowerCase(),
		body('username').isAlphanumeric(),
		registerUser
	);

//update user
users.route('/update').put((req, res) => {
	const { _id } = req.user;
	const { body } = req;
	let confirmation = 'User successfully updated';

	User.findByIdAndUpdate(_id, body, (err) => {
		if (err) confirmation = 'Invalid ID';

		res.json(confirmation);
	});
});

//delete user
users.route('/:id?').delete((req, res) => {
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

//find user
users.route('/query').get(async (req, res) => {
	const { body } = req;
	let result;
	try {
		result = await User.find(body);
		result.sort((a, b) => {
			if (b.lastname > a.lastname) return -1;
			if (a.lastname > b.lastname) return 1;
			return 0;
		});
	} catch (err) {
		result = err.message;
	}
	console.log(result);

	res.json(result);
});

//login
users.route('/login').post(
	(req, res, next) => {
		console.log('logging in...');
		req.body.email = req.body.email.toLowerCase();
		next();
	},
	passport.authenticate('local', {
		failureFlash: true,
	}),
	verifyLogin
);

//logout
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

users.route('/myinfo').get((req, res, next) => {
	console.log('my info executes');
	next();
}, verifyLogin);

module.exports = users;
