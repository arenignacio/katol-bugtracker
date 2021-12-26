const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByEmail, getUserById) => {
	//authenticate callback
	const authenticateUser = async (email, password, done) => {
		const user = getUserByEmail(email);

		if (!user) {
			return done(null, false, { message: 'Incorrect email or password' });
		}

		/* 	await bcrypt.compare(password, user.password, (err, result) =>
			console.log(result)
		); */

		/* try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, {
					messsage: 'Incorrect email or password',
				});
			}
		} catch (err) {
			return done(err);
		} */
	};

	//use strategy
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, authenticateUser)
	);

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => done(null, getUserById(id)));
};

module.exports = initialize;
