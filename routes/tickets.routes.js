const express = require('express');
const Ticket = require('../models/Ticket');

const app = express();
const Router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//new ticket
Router.route('/create-ticket').post((req, res) => {
	const { body } = req;

	if (body['assigned_to.name']) body.status = 'assigned';

	Ticket.create(body, (err) => {
		if (err) {
			console.log(err.message);
			res.send(`error: ${err.message}`);
		}

		res.send('Ticket successfully created');
	});
});

//edit existing ticket
Router.route('/:id').put((req, res) => {
	const { id } = req.params;
	const update = req.body;

	Ticket.findByIdAndUpdate(id, update, (err, doc) => {
		let confirmation = `Document ${id} successfully updated.`;

		if (err) confirmation = err.message;

		if (update.assigned_to && doc.status === 'initiated') {
			doc.status = 'assigned';
			doc.save();
		}

		res.send(confirmation);
	});
});

//delete
Router.route('/:id').delete((req, res) => {
	const { id } = req.params;
	let confirmation = `Document ${id} successfully deleted.`;

	Ticket.findByIdAndDelete(id, (err) => {
		if (err) confirmation = err.message;

		res.send(confirmation);
	});
});

module.exports = Router;
