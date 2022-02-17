const express = require('express');
const { body, validationResult } = require('express-validator');
const Ticket = require('../models/Ticket');
const Project = require('../models/Project');
//const { DateTime } = require('luxon');
// DateTime.fromJSDate(doc.date_initiated).toLocaleString(DateTime.DATE_MED)  ----returns Mon, DD, YYYY

const Router = express.Router();

//new ticket
Router.route('/new').post(
	body('initiated_by.username').trim().escape().toLowerCase(),
	body('assigned_to').optional().trim().escape().toLowerCase(),
	body('subject').trim().escape(),
	body('description').trim().escape(),
	async (req, res) => {
		const input = req.body;
		const user = req.user;
		const errors = validationResult(req); //validate body
		const project = await Project.findById(input.project);
		const members = project.members;

		console.log(project);

		//if errors is not empty, return array of all errors
		if (!errors.isEmpty()) res.json(errors.array());
		//else create new ticket
		else if (user) {
			if (!input.subject || !input.description) {
				res.status(422).json('Fill in required fields');
			} else {
				input.status =
					input.assigned_to === 'none' ? 'initiated' : 'assigned';
				input.initiated_by = {
					email: user.email,
					name: `${user.firstname} ${user.lastname}`,
				};
				input.assigned_to =
					input.assigned_to === 'none'
						? { email: 'none', name: 'none' }
						: members.filter(
								(member) => member.email === input.assigned_to
						  )[0];

				input.last_updated = { date: new Date(), by: user.email };

				Ticket.create(input, (err, doc) => {
					if (err) {
						console.log(err.message);
						res.status(201).json(`error: ${err.message}`);
					} else res.json(doc);
				});
			}
		} else {
			res.status(401).json('User not authenticated');
		}
	}
);

//find tickets
Router.route('/query*').get(async (req, res) => {
	const urlStart = req.url.indexOf('?') + 1;
	const url = req.url.substring(urlStart);
	const params = url.split('&');

	//make object containing params to be passed into query
	const query = params.reduce((acc, cur) => {
		if (!cur.includes('=')) return acc;

		cur = cur.split('=');
		acc[cur[0]] = cur[1];
		return acc;
	}, {});

	let result = null;

	try {
		result = await Ticket.where(query);
	} catch (err) {
		result = err.message;
	}

	res.json(result);
});

//add, fetch comment
Router.route('/:id/comments')
	.all((req, res, next) => {
		console.log('comments executed');
		next();
	})
	.post(async (req, res) => {
		console.log('post comment executed');
		const { id } = req.params;

		const ticket = await Ticket.findById(id);
		const project = await Project.findById(ticket.project);
		const members = project.members;
		let result;

		try {
			//if user is authenticated
			if (
				req.isAuthenticated() &&
				members.find(({ email }) => email === req.user.email)
			) {
				console.log('authenticated and member');
				const { email, firstname, lastname } = req.user;
				const body = {
					content: req.body.content,
					author_email: email,
					author: `${firstname} ${lastname}`,
				};
				ticket.comments.push(body);
				await ticket.save();
				result = ticket.comments;
			}

			console.log('empty space');
		} catch (err) {
			console.log('not authenticated');
			result = { err };
		}

		console.log('json reached');
		res.json(result);
	});

//get, edit, delete existing ticket
Router.route('/:id')
	.all((req, res, next) => {
		console.log('ticket executed');
		next();
	})
	.get(async (req, res) => {
		console.log('getting individual ticket');

		try {
			const id = req.params.id;
			const ticket = await Ticket.where({ _id: id });
			res.json(ticket);
		} catch (err) {
			console.log(err);
			res.status(201).json('Ticket does not exist');
		}
	})
	.put(
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
		async (req, res) => {
			console.log('ticket put');
			const { id } = req.params;
			const { subject, status, type, assigned_to, description, priority } =
				req.body;
			const errors = validationResult(req);

			//check if forms are filled out properly
			if (!errors.isEmpty()) {
				console.log('error!!');
				res.json(errors.array());
			} else {
				const ticket = await Ticket.findById(id);
				const project = await Project.where({ _id: ticket.project });
				const members = project[0].members;
				const pm = project[0].project_manager;

				if (!members.find(({ email }) => email === req.user.email)) {
					console.log('not member');
					res.status(403).json('unauthorized action');
				} else if (
					!pm.find(({ email }) => email === req.user.email) &&
					ticket.assigned_to.email !== assigned_to
				) {
					console.log(
						pm.find(({ email }) => {
							console.log(email, req.user.email);
							return email === req.user.email;
						})
					);
					console.log('not pm');
					res.status(403).json('unauthorized action');
				} else {
					ticket.subject = subject;
					ticket.type = type;
					ticket.description = description;
					ticket.priority = priority;

					if (assigned_to !== 'none') {
						const assignee = members.filter(
							(member) => member.email === assigned_to
						)[0];

						ticket.assigned_to = assignee;
						ticket.status = status !== 'resolved' ? 'assigned' : status;
					} else {
						ticket.assigned_to = { email: 'none', name: 'none' };
						ticket.status = 'unassigned';
					}

					ticket.last_updated = { date: new Date(), by: req.user.email };
					ticket.save().then((updatedTicket) => res.json(updatedTicket));
				}
			}
		}
	)
	.delete((req, res) => {
		const { id } = req.params;
		let confirmation = `Document ${id} successfully deleted.`;

		Ticket.findByIdAndDelete(id, null, (err) => {
			if (err) confirmation = 'Invalid ID';

			res.send(confirmation);
		});
	});

module.exports = Router;
