import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASEURL } from '../utils/constants';

/* 
todo: fetch project data 
todo: make selected ticket collapsable
*/

//#components
import List from '../../src/components/List';
import SelectedTicket from './SelectedTicket';

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
	}

	.selected-ticket-container {
		height: ${({ selectedTicket }) => {
			if (selectedTicket) return '90';
			else return '10';
		}}%;
		width: 80%;
		border: 1px solid black;
	}
`;

const Projects = () => {
	//#immutables
	const ticketheaders = ['Ticket ID', 'Subject', 'Assigned To'];

	//#states
	const [tickets, setTickets] = useState(null);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [project, setProject] = useState(null);

	useEffect(() => {
		const getTicket = async () => {
			const result = await fetch(
				`${API_BASEURL}/ticket/query?project=61ed05ec878f129f1a51e196`
			);

			const data = await result.json();
			setTickets(data);
		};

		getTicket();
	}, []);

	const sortTickets = (tickets) => {
		return tickets.reduce((acc, cur) => {
			acc.push([cur._id, cur.subject, cur.assigned_to.name]);

			return acc;
		}, []);
	};

	const selectTicket = async (e) => {
		const row = e.target.parentNode;
		const result = await fetch(`${API_BASEURL}/ticket/${row.id}`);
		const data = await result.json();
		console.log(data);
		setSelectedTicket(data[0]);
	};

	return (
		<Wrapper selectedTicket={selectedTicket}>
			<span className="project-name">Project 1</span>
			<div>
				<div className="members">
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
				<div className="tickets">
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
										['6'],
										['7'],
										['8'],
										['9'],
										['10'],
										['11'],
										['12'],
										['13'],
										['14'],
										['15'],
										['16'],
										['17'],
										['18'],
										['19'],
										['20'],
								  ]
								: ''
						}
						attributes={{
							isSelectable: true,
							isScrollable: true,
							isHoverable: true,
						}}
						overflowBoundary={10}
						handleClick={selectTicket}
					/>
				</div>
			</div>
			<div>
				<div className="selected-ticket-container">
					<SelectedTicket ticket={selectedTicket} />
				</div>
			</div>
		</Wrapper>
	);
};

export default Projects;
