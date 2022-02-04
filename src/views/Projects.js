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
		width: 33%;
	}

	.tickets {
		width: 45%;
	}

	.members,
	.tickets {
		height: 250px;
	}

	.selected-ticket-container {
		height: fit-content;
		width: 80%;
	}

	.rounded {
		border-radius: 5px;
		overflow: hidden;
	}

	.border {
		&-solid {
			border: 1px solid black;
		}
	}
`;

const Projects = () => {
	//#immutables
	const ticketheaders = ['Ticket ID', 'Subject', 'Status'];
	const API = requests(API_BASEURL);

	//#states
	const [tickets, setTickets] = useState(null);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [project, setProject] = useState(null);

	useEffect(() => {
		const getTicket = async () => {
			const data = await API.get(
				'ticket/query?project=61ed05ec878f129f1a51e196'
			);
			setTickets(data);
		};

		getTicket();
	}, []);

	const sortTickets = (tickets) => {
		return tickets.reduce((acc, cur) => {
			acc.push([cur._id, cur.subject, cur.status]);

			return acc;
		}, []);
	};

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
					<List
						colsize={3}
						headers={['Name', 'Phone', 'E-mail']}
						content={[
							[
								'Aren Ignacio',
								'(123) 457-9999',
								'business.arenignacio@email.com',
							],
						]}
						attributes={{
							isSelectable: false,
							isHoverable: true,
							isScrollable: true,
						}}
					/>
				</div>
				<div className="tickets border-solid rounded">
					<List
						colsize={3}
						headers={ticketheaders}
						content={
							tickets
								? [
										...sortTickets([...tickets]),
										['1'],
										['2'],
										['3'],
										['4'],
										['5'],
								  ]
								: ''
						}
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
