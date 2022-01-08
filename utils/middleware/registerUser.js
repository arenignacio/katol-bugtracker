//#dependencies
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const capitalize = require('../stringMutator');

//#models
const User = require('../../models/User');

const registerUser = (req, res, next) => {
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
			body.firstname = capitalize(body.firstname);
			body.lastname = capitalize(body.lastname);
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
								firstname: user.firstname,
								lastname: user.lastname,
								username: user.username,
							});
						}
					});
				}
			});
		}
	});
};

module.exports = registerUser;
