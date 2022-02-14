import { field } from '../components/Form';
import { API_BASEURL } from './constants';
import requests from './requests';

const ticketOptionGenerator = async (ticket, btnArray) => {
	const API = requests(API_BASEURL);
	const {
		_id: id,
		subject,
		status,
		type,
		assigned_to,
		description,
		project,
	} = ticket;
	const email = assigned_to.email;

	const owner = await API.get('project/' + project);
	const members = owner[0].members.map((member) => member.email);

	return {
		fetchData: {
			url: `${API_BASEURL}/ticket/${id}`,
			options: {
				method: 'Put',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: '',
			},
		},
		fields: [
			new field('Subject', 'subject', '', 'text', subject),
			new field('Status', 'status', '', 'text', status),
			new field('Priority', 'priority', ' ', 'select', 'normal', [
				'low',
				'normal',
				'high',
			]),
			new field('Type', 'type', '', 'select', type, ['bug', 'feature']),
			new field('Assigned To', 'assigned_to', '', 'select', email, members),
			new field('Description', 'description', ' ', 'textarea', description, {
				maxLength: '200',
			}),
		],
		buttons: btnArray,
	};
};

export default ticketOptionGenerator;
