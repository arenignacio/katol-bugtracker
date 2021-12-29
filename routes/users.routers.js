//#modules
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

//#imports
const User = require('../models/User');

//#initializers
const users = express.Router();

users.route('/register').post((req, res) => {
	const { body } = req;

	bcrypt.hash(body.password, 10, async (err, hash) => {
		if (err) res.send(err.message);
		body.password = hash;

		if (await User.exists({ username: body.username })) {
			res.send('Account already exists. Please log in to continue.');
		} else {
			await User.create(body);
			res.send('Account successfully created');
		}
	});
});

users.route('/:id').put((req, res) => {
	const { id } = req.params;
	const { body } = req;
	let confirmation = 'User successfully updated';

	User.findByIdAndUpdate(id, body, (err) => {
		if (err) confirmation = 'Invalid ID';

		res.send(confirmation);
	});
});

users.route('/:id').delete((req, res) => {
	const { id } = req.params;
	let confirmation = 'User successfully deleted';

	User.findByIdAndDelete(id, null, (err) => {
		if (err) confirmation = 'Invalid ID';

		res.send(confirmation);
	});
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
			res.status(200).send('okay');
		} else {
			res.status(404).send('bad');
		}
		console.log(req.session);
		res.end();
	}
);

users.route('/amIloggedIn').get((req, res) => {
	console.log('user is logged in ' + req.user);
	res.end();
});

users.route('/myinfo').get((req, res) => res.json(req.user));

module.exports = users;
