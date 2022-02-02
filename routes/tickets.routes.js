const express = require('express');
const { body, validationResult } = require('express-validator');
const Ticket = require('../models/Ticket');
//const { DateTime } = require('luxon');
// DateTime.fromJSDate(doc.date_initiated).toLocaleString(DateTime.DATE_MED)  ----returns Mon, DD, YYYY

const Router = express.Router();

//new ticket
Router.route('/create-ticket').post(
	body('initiated_by.username').trim().escape().toLowerCase(),
	body('assigned_to.id').optional().trim().escape().toLowerCase(),
	body('subject').trim().escape(),
	body('description').trim().escape(),
	body('assigned_to.name').optional().trim().escape().toLowerCase(),
	body('initiated_by.name').trim().escape().toLowerCase(),
	(req, res) => {
		const input = req.body;
		const errors = validationResult(req); //validate body

		//if errors is not empty, return array of all errors
		if (!errors.isEmpty()) res.json(errors.array());
		//else create new ticket
		else if (req.user) {
			input.status = input['assigned_to'] ? 'assigned' : 'initiated';
			input.initiated_by.id = req.user._id;
			Ticket.create(input, (err) => {
				if (err) {
					console.log(err.message);
					res.status(201).send(`error: ${err.message}`);
				} else res.send('Ticket successfully created');
			});
		} else {
			res.status(401).send('Unauthorized user');
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
		const errors = validationResult(req);
		update.last_updated = new Date();

		if (!errors.isEmpty()) res.json(errors.array());
		else {
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
Router.route('/query*').get(async (req, res) => {
	const params = req.url.split('&');
	const query = params.reduce((acc, cur) => {
		if (!cur.includes('=')) return acc;

		cur = cur.split('=');
		acc[cur[0]] = cur[1];
		return acc;
	}, {});

	console.log(query);

	let result = null;

	try {
		result = await Ticket.where(query);
	} catch (err) {
		result = err.message;
	}

	res.json(result);
});

//get individual ticket
Router.route('/:id').get(async (req, res) => {
	console.log('get individual ticket executed');

	try {
		const id = req.params.id;
		const ticket = await Ticket.where({ _id: id });
		res.json(ticket);
	} catch (err) {
		res.status(201).json('Ticket does not exist');
	}
});

module.exports = Router;
