const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

module.exports = users;
