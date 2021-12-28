const express = require('express');
const { body, validationResult } = require('express-validator');
const Ticket = require('../models/Ticket');
//const { DateTime } = require('luxon');
// DateTime.fromJSDate(doc.date_initiated).toLocaleString(DateTime.DATE_MED)  ----returns Mon, DD, YYYY

const Router = express.Router();

//new ticket
Router.route('/create-ticket').post(
	body('initiated_by.id', 'id must be an email')
		.isEmail()
		.trim()
		.escape()
		.toLowerCase(),
	body('assigned_to.id', 'id must be an email')
		.optional()
		.isEmail()
		.trim()
		.escape()
		.toLowerCase(),
	body('subject').trim().escape(),
	body('description').trim().escape(),
	body('assigned_to.name').optional().trim().escape().toLowerCase(),
	body('initiated_by.name').trim().escape().toLowerCase(),
	(req, res) => {
		const input = req.body;
		const errors = validationResult(req);
		console.log(input);

		if (!errors.isEmpty()) res.json(errors.array());
		else {
			input.status = input['assigned_to'] ? 'assigned' : 'initiated';
			Ticket.create(input, (err) => {
				if (err) {
					console.log(err.message);
					res.send(`error: ${err.message}`);
				} else res.send('Ticket successfully created');
			});
		}
	}
);

//edit existing ticket
Router.route('/:id').put(
	body('initiated_by.id', 'id must be an email')
		.isEmail()
		.optional()
		.trim()
		.escape()
		.toLowerCase(),
	body('assigned_to.id', 'id must be an email')
		.optional()
		.isEmail()
		.trim()
		.escape()
		.toLowerCase(),
	body('subject').trim().escape().optional(),
	body('description').trim().escape().optional(),
	body('assigned_to.name').optional().trim().escape().toLowerCase(),
	body('initiated_by.name').trim().escape().optional().toLowerCase(),
	(req, res) => {
		const { id } = req.params;
		const update = req.body;
		update.last_updated = new Date();

		Ticket.findByIdAndUpdate(id, update, (err, doc) => {
			let confirmation = `Document ${id} successfully updated.`;

			if (err) confirmation = err.message;

			if (update.assigned_to && doc.status === 'initiated') {
				doc.status = 'assigned';
				doc.save();
			}

			res.send(confirmation);
		});
	}
);

//delete
Router.route('/:id').delete((req, res) => {
	const { id } = req.params;
	let confirmation = `Document ${id} successfully deleted.`;

	Ticket.findByIdAndDelete(id, null, (err) => {
		if (err) confirmation = 'Invalid ID';

		res.send(confirmation);
	});
});

//find tickets
Router.route('/query').get(async (req, res) => {
	const { body } = req;
	let result = null;
	try {
		result = await Ticket.where(body);
	} catch (err) {
		result = err.message;
	}

	res.json(result);
});

module.exports = Router;
