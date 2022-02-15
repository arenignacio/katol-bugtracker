import { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { API_BASEURL } from '../utils/constants';
import { UserContext } from '../App';

//#utility functions
import requests from '../utils/requests';
import {
	generateTicketOptions,
	newticketOptionGenerator,
} from '../utils/ticketOption';

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

	.members,
	.tickets {
		height: fit-content;
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
	}

	.members {
		width: 25%;
	}

	.tickets {
		width: 45%;

		&:hover .new {
			opacity: 1;
		}
	}

	.selected-ticket-container {
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
		height: fit-content;
		width: 80%;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2px;
		padding-left: 15px;
		background: white;
		font-size: 1.3rem;

		.new {
			font-weight: 300;
			font-size: 1rem;
			margin-right: 15px;
			letter-spacing: 0.7px;
			opacity: 0.5;
			transition: opacity 0.3s ease-in-out;

			&:hover {
				font-weight: bold;
				cursor: pointer;
			}
		}
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

	//#refs
	const isMounted = useRef(false);

	//#states
	const [newTicket, setNewTicket] = useState(null);
	const [tickets, setTickets] = useState(null);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [editMode, setEditMode] = useState(null);
	const [ticketOptions, setTicketOptions] = useState(null);
	const [user, setUser] = useContext(UserContext);
	const [projectOptions, setProjectOptions] = useState(null);
	const [project, setProject] = useState(null);

	//#get project on first render
	useEffect(() => {
		const getProject = async () => {
			const data = await API.get(`project/`);
			setTickets(data);
		};
	}, []);

	//
	useEffect(() => {
		/////todo: needs url
		/////todoo: populate fields initial value with selected ticket data
		//todo: need Save button to get data and update selectedTicket

		//update tickets table
		const getTicket = async () => {
			const data = await API.get(`ticket/query?project=${currentProject}`);
			setTickets(data);
		};

		const getOptions = async () => {
			console.log('selected ticket changed', selectedTicket);
			const buttons = [
				{
					name: 'Save',
					handler: async (data) => {
						console.log('data from save: ', data);
						setSelectedTicket(data);
						setEditMode(null);
					},
				},
				{
					name: 'Cancel',
					handler: () => setEditMode(null),
				},
			];

			if (isMounted.current) {
				let options;
				console.log(editMode);

				if (editMode === 'ticket') {
					console.log('generating ticket options');
					options = await generateTicketOptions(selectedTicket, buttons);
				} else if (editMode === 'new-ticket') {
					console.log('generating new ticket options');
					options = await newticketOptionGenerator(newTicket, buttons);
				}

				await setTicketOptions(options);
			} else {
				isMounted.current = true;
			}
		};

		getTicket();
		getOptions();
	}, [selectedTicket, newTicket, editMode]);

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

	//#new ticket handler
	const createTicket = async () => {
		await setNewTicket({
			subject: '',
			description: '',
			status: 'initiated',
			priority: 'normal',
			type: 'bug',
			assigned_to: { email: 'none', name: 'none' },
			initiated_by: {
				email: user.email,
				name: `${user.firstname} ${user.lastname}`,
			},
			project: currentProject,
			last_updated: { date: new Date() },
			comments: [],
		});
		await setEditMode('new-ticket');
	};

	return (
		<>
			{editMode ? (
				<Modal
					options={ticketOptions}
					onClickHandler={(e) => {
						if (e.target.className.includes('background')) {
							e.target.classList.toggle('hidden');
							setEditMode(null);
						}
					}}
				/>
			) : (
				''
			)}
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
						<div className="title">
							Tickets
							<span className="new" onClick={() => createTicket()}>
								new
							</span>
						</div>
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
							handleEdit={(input) => {
								setEditMode(input);
							}}
							ticket={selectedTicket}
						/>
					</div>
				</div>
			</Wrapper>
		</>
	);
};

export default Projects;
