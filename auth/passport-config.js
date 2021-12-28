const bcrypt = require('bcrypt');
const User = require('../models/User');

const authenticateUser = async (email, password, done) => {
	const user = User.findOne({ email: email }, (err, user) => {
		console.log(`user is ${user}`);

		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, { message: 'Incorrect email or password' });
		}
	});

	if (!user) {
		return done(null, false, { message: 'Incorrect email or password' });
	}

	bcrypt.compare(password, user.password, (err, match) => {
		console.log(password, user.password, match);

		if (match) {
			return done(null, user);
		} else {
			return done(null, false, {
				messsage: 'Incorrect email or password',
			});
		}
	});
};

module.exports = authenticateUser;
