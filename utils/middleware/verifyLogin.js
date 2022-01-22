const verifyLogin = (req, res) => {
	if (req.user) {
		console.log('successfully logged in');
		const { firstname, username, lastname, email, phone, location, aboutme } =
			req.user;

		res.status(200).json({
			username,
			firstname,
			lastname,
			email,
			phone,
			location,
			aboutme,
		});
	} else {
		console.log('user login fail');
		res.status(401).json('bad');
	}
};

module.exports = verifyLogin;
