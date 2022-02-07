import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASEURL } from '../utils/constants';
import requests from '../utils/requests';

/* 
todo: fetch project data 
todo: make selected ticket collapsable
*/

//#components
import List from '../../src/components/List';
import SelectedTicket from '../components/SelectedTicket';

const Wrapper = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 25px;
	background: rgba(0, 0, 0, 0.1);
	overflow-y: scroll;

	> div {
		display: flex;
		justify-content: space-evenly;
		box-sizing: border-box;
		height: 44%;
		width: 100%;
	}

	.project-name {
		display: flex;
		font-size: 2.7rem;
		height: 10%;
		margin: 10px 15px;
		padding-left: 50px;
	}

	.members {
		width: 25%;
	}

	.tickets {
		width: 45%;
	}

	.members,
	.tickets {
		height: 250px;
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
	}

	.selected-ticket-container {
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
		height: fit-content;
		width: 80%;
	}

	.title {
		display: flex;
		align-items: center;
		padding: 2px;
		padding-left: 15px;
		background: white;
		font-size: 1.3rem;
	}

	.rounded {
		border-radius: 5px;
		overflow: hidden;
	}

	.border {
		&-solid {
			border: 1px solid rgba(0, 0, 0, 0.3);
		}
	}
`;

const Projects = () => {
	//#immutables
	const ticketheaders = ['Ticket ID', 'Subject', 'Status'];
	const API = requests(API_BASEURL);
	const currentProject = '61ed05ec878f129f1a51e196';

	//#states
	const [tickets, setTickets] = useState(null);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [project, setProject] = useState(null);

	useEffect(() => {
		const getTicket = async () => {
			const data = await API.get(`ticket/query?project=${currentProject}`);
			console.log('testing112345');
			//comment test
			/* await API.post(`ticket/61c265c096a7d556d5a875a6/comments`, {
				content: 'Hello!!123',
				author: 'John Doe',
				author_email: 'johdoe1213@email.com',
			}); */
			setTickets(data);
		};

		getTicket();
	}, []);

	//sort ticket data to be fed into list
	const sortTickets = (tickets) => {
		return tickets.reduce((acc, cur) => {
			acc.push([cur._id, cur.subject, cur.status]);

			return acc;
		}, []);
	};

	//select ticket handler
	const selectTicket = async (e) => {
		const row = e.target.parentNode;
		const data = await API.get(`ticket/${row.id}`);
		console.log(data);
		setSelectedTicket(data[0]);
	};

	return (
		<Wrapper selectedTicket={selectedTicket}>
			<span className="project-name">Project 1</span>
			<div>
				<div className="members border-solid rounded">
					<div className="title">Members</div>
					<List
						subject={'Members'}
						colsize={3}
						headers={['Name', 'E-mail']}
						content={[['Aren Ignacio', 'business.arenignacio@email.com']]}
						attributes={{
							isSelectable: false,
							isHoverable: true,
							isScrollable: true,
						}}
					/>
				</div>
				<div className="tickets border-solid rounded">
					<div className="title">Tickets</div>
					<List
						subject={'Tickets'}
						colsize={3}
						headers={ticketheaders}
						content={tickets ? sortTickets([...tickets]) : ''}
						attributes={{
							isSelectable: true,
							isScrollable: true,
							isHoverable: true,
						}}
						handleClick={selectTicket}
						viewableRows={10}
					/>
				</div>
			</div>
			<div>
				<div className="selected-ticket-container border-solid rounded">
					<SelectedTicket ticket={selectedTicket} />
				</div>
			</div>
		</Wrapper>
	);
};

export default Projects;
