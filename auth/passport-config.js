const bcrypt = require('bcrypt');
const User = require('../models/User');

//authentication callback
const authenticateUser = async (email, password, done) => {
	//passport looks for fields username and password to pass as an argument into this callback and also passes a done function  as callback. (done already comes packaged in passport)

	//check if email exists in User collection
	User.findOne({ email: email }, (err, user) => {
		//if error
		if (err) {
			//done catches error
			return done(err);
		}

		//if user doesn't exist
		if (!user) {
			//done(error, userdata, errorMsg)
			return done(null, false, { message: 'Incorrect email or password' });
		}

		//if no error is found and user exists, compare password to user found
		bcrypt.compare(password, user.password, (err, match) => {
			//match will return true if password is a match
			if (match) {
				//done(error, userData)
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
