import { field } from '../components/Form';
import { API_BASEURL } from './constants';

const projectOptionGenerator = (project, btnArray) => {
	const { _id: id, name, completed, description } = project;
	return {
		fetchData: {
			url: `${API_BASEURL}/project/${id}`,
			options: {
				method: 'Put',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: '',
			},
		},
		fields: [
			new field('Name', 'name', 'Enter name', 'text', name),
			new field(
				'Completed',
				'completed',
				'',
				'selected',
				completed ? 'yes ' : 'no',
				['yes', 'no']
			),
			new field('Description', 'description', ' ', 'textarea', description, {
				maxLength: '200',
			}),
		],
		buttons: btnArray,
	};
};

export default projectOptionGenerator;
