/* import { field } from '../components/Form';
import { API_BASEURL } from './constants';

const projectOptionGenerator = (project, btnArray) => {
	const { _id: id, name, status, type, assigned_to, description } = project;
	const name = assigned_to.name;
   

	return {
		fetchData: {
			url: `${API_BASEURL}/ticket/${id}`,
			options: {
				method: 'Post',
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
			new field('Assigned To', 'assigned_to', '', 'select', name, [
				'user1',
				'user2',
				name,
			]),
			new field('Description', 'description', ' ', 'textarea', description, {
				maxLength: '200',
			}),
		],
		buttons: btnArray,
	};
};

export default projectOptionGenerator;
 */
