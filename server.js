if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

//#modules
const express = require('express');
const mongoose = require('mongoose');
// const nodemailer = require('nodemailer'); //# nodemailer can be used for sending emails

//#imports
const mongodb = require('./database/db');
const ticketRoute = require('./routes/tickets.routes');
const userRoute = require('./routes/users.routers');
const projectRoute = require('./routes/projects.routes');

//#initializers
const app = express();

//connect to db
mongoose.connect(mongodb.db, (err) => {
	if (err) {
		console.log('Failed to connect to database. ' + err.message);
	} else {
		console.log('Successfully connected to database');
	}
});

//middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/build'));

//routes
app.use('/ticket', ticketRoute);
app.use('/user', userRoute);
app.use('/project', projectRoute);

app.get('*', (req, res) => {
	res.status(404).send('Oops. Page not found. Did you mean something else?');
});

app.listen(process.env.PORT || 3000, () =>
	console.log('Listening on port ' + process.env.PORT || 3000)
);
