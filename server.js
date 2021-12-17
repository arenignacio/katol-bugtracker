const express = require('express');
// const nodemailer = require('nodemailer'); //# nodemailer can be used for sending emails

const app = express();
require('dotenv').config();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/build'));
app.listen(process.env.PORT || 3000, () =>
	console.log('Listening on port 3000')
);

//test apis
app.post('/users/registration', (req, res, next) => {
	console.log(req.body, req.headers);

	res.send('Good');
});

app.get('*', (req, res) => {
	res.status(404).send('Oops. Page not found. Did you mean something else?');
});
