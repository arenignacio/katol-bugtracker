if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

//#modules
const path = require('path');
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const nodemailer = require('nodemailer'); //# nodemailer can be used for sending emails

//#imports
//const mongodb = require('./database/db');
const authenticate = require('./auth/passport-config');
const ticketRoute = require('./routes/tickets.routes');
const userRoute = require('./routes/users.routers');
const projectRoute = require('./routes/projects.routes');
const User = require('./models/User');

//#initializers
const app = express();

//#connect to db
mongoose.connect(process.env.DB_URL, (err) => {
	if (err) {
		console.log('Failed to connect to database. ' + err.message);
	} else {
		console.log('Successfully connected to database');
	}
});

//#middleware
//app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(express.static(path.join(__dirname + '/build')));

//#authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, authenticate));

passport.serializeUser((user, done) => {
	console.log('user is ' + user);
	done(null, user._id);
});
passport.deserializeUser((id, done) =>
	User.findById(id, (err, user) => done(err, user))
);

//#routes
app.use('/ticket', ticketRoute);
app.use('/user', userRoute);
app.use('/project', projectRoute);
app.use('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(process.env.PORT || 3000, () =>
	console.log('Listening on port ' + process.env.PORT || 3000)
);
