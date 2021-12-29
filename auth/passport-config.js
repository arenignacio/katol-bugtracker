const bcrypt = require('bcrypt');
const User = require('../models/User');

const authenticateUser = async (email, password, done) => {
	User.findOne({ email: email }, (err, user) => {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, { message: 'Incorrect email or password' });
		}

		bcrypt.compare(password, user.password, (err, match) => {
			if (match) {
				return done(null, user);
			} else {
				return done(null, false, {
					messsage: 'Incorrect email or password',
				});
			}
		});
	});
};

module.exports = authenticateUser;
