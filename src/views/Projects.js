import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { API_BASEURL } from '../utils/constants';

//#utility functions
import requests from '../utils/requests';
import generateTicketOptions from '../utils/ticketOption';

/* 
todo: fetch project data 
*/

//#components
import List from '../../src/components/List';
import SelectedTicket from '../components/SelectedTicket';
import Modal from '../components/Modal';

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

		&:not(:first-of-type) {
			min-height: 40%;
		}

		&.project-name-container {
			justify-content: flex-start;
			height: 10%;
			margin: 10px 15px;
			padding-left: 50px;

			div {
				font-family: lato, sans-serif;
				font-size: 2rem;
				height: fit-content;
				border-radius: 2.5px;
				padding: 7px 10px;
				transition: box-shadow 0.3s ease-in-out;

				&:hover {
					cursor: pointer;
					box-shadow: 3px 5px 10px 1px rgba(0 0 0 / 30%);
				}
			}
		}
	}

	.members {
		width: 25%;
	}

	.tickets {
		width: 45%;
	}

	.members,
	.tickets {
		height: fit-content;
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
/* 
const Modal = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90vw;
	height: 95vh;
	backdrop-filter: blur(1.5px);
	z-index: 4;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: fit-content;
		width: 30%;
		box-sizing: border-box;
		padding: 25px;
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 2.5px;
		z-index: 5;

		.modal-header {
			display: flex;
			justify-content: center;
			margin-bottom: 30px;
			font-size: 1.5rem;
		}
	}

	&.hidden {
		display: none;
	}
`; */

const Projects = () => {
	//#immutables
	const ticketheaders = ['Ticket ID', 'Subject', 'Status'];
	const API = requests(API_BASEURL);
	const currentProject = '61ed05ec878f129f1a51e196';

	//#refs
	const isMounted = useRef(false);

	//#states
	const [tickets, setTickets] = useState(null);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [editMode, setEditMode] = useState(null);
	const [ticketOptions, setTicketOptions] = useState(null);
	const [projectOptions, setProjectOptions] = useState(null);
	const [project, setProject] = useState(null);

	//#get project on first render
	useEffect(() => {
		const getProject = async () => {
			const data = await API.get(`project/`);
			setTickets(data);
		};
	}, []);

	//#get tickets on first render
	useEffect(() => {
		const getTicket = async () => {
			const data = await API.get(`ticket/query?project=${currentProject}`);
			setTickets(data);
		};

		getTicket();
	}, []);

	//
	useEffect(() => {
		/////todo: needs url
		//todoo: populate fields initial value with selected ticket data

		const buttons = [
			{
				name: 'Save',
				handler: () => {
					if (editMode === 'ticket') console.log('save clicked on ticket');
					else console.log('save clicked on project');
				},
			},
			{
				name: 'Cancel',
				handler: () => setEditMode(null),
			},
		];

		if (isMounted.current) {
			console.log('select ticket option assigned');
			const options = generateTicketOptions(selectedTicket, buttons);
			setTicketOptions(options);
		} else {
			console.log('select ticket option not assigned');
			isMounted.current = true;
		}
	}, [selectedTicket]);

	//#sort ticket data to be fed into List
	const sortTickets = (tickets) => {
		return tickets.reduce((acc, cur) => {
			acc.push([cur._id, cur.subject, cur.status]);

			return acc;
		}, []);
	};

	//#select ticket handler
	const selectTicket = async (e) => {
		const row = e.target.parentNode;
		const data = await API.get(`ticket/${row.id}`);
		setSelectedTicket(data[0]);
	};

	return (
		<>
			<Modal
				options={ticketOptions}
				editMode={editMode}
				onClickHandler={(e) => {
					if (e.target.className.includes('background')) {
						e.target.classList.toggle('hidden');
						setEditMode(null);
					}
				}}
			/>
			<Wrapper>
				<div className="project-name-container">
					<div className="project-name"> Project 1</div>
				</div>
				<div>
					<div className="members border-solid rounded">
						<div className="title">Members</div>
						<List
							subject={'Members'}
							colsize={3}
							headers={['Name', 'E-mail']}
							content={[
								['Aren Ignacio', 'business.arenignacio@email.com'],
							]}
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
						<SelectedTicket
							handleEdit={setEditMode}
							ticket={selectedTicket}
						/>
					</div>
				</div>
			</Wrapper>
		</>
	);
};

export default Projects;
