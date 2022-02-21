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
todo: members not updating, saveHandler not executing
//todo: need error handling for ticket form and ticket route (crashes when creating incomplete ticket)
//todo: app crashes when submitting a complete new ticket with a changed "assigned_to" from none to x 2/16/2022
//todo: edit member (Wheel) crashes after user edits ticket

*/

//#components
import List from '../../src/components/List';
import SelectedTicket from '../components/SelectedTicket';
import Modal from '../components/Modal';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Wrapper = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.1);
	overflow-y: scroll;

	> div {
		display: flex;
		justify-content: space-evenly;
		box-sizing: border-box;
		height: 44%;

		&:not(:first-of-type) {
			min-height: 40%;
		}

		&.project-name-container {
			justify-content: flex-start;
			align-items: center;
			height: 10%;
			margin: 10px;

			.project-name {
				display: flex;
				align-items: center;
				font-family: lato, sans-serif;
				font-size: 1.8rem;
				height: fit-content;
				border-radius: 2.5px;
				padding: 7px 50px;

				&:hover {
					cursor: pointer;

					.project-name-menu {
						opacity: 1;

						span {
							opacity: 1;
						}
					}
				}
			}
		}
	}

	div.project-name-menu {
		opacity: 0;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		font-size: 0.8rem;
		margin-left: 25px;

		span {
			opacity: 0;
			transition: opacity 0.5s ease-in-out;
			margin-left: 10px;

			&:hover {
				color: brown;
			}
		}
	}

	.members,
	.tickets {
		height: fit-content;
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);

		&:hover .title-btn {
			opacity: 1;
		}
	}

	.members {
		width: 25%;
	}

	.tickets {
		width: 45%;
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

		&-btn {
			font-weight: 300;
			font-size: 1rem;
			margin-right: 15px;
			letter-spacing: 0.7px;
			opacity: 0.5;
			transition: opacity 0.3s ease-in-out;

			&.hidden {
				display: none;
			}

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

	.active {
		&:hover .btn-delete {
			opacity: 1;
		}
	}

	.status {
		display: flex;
		justify-content: space-between;

		.btn-delete {
			opacity: 0;
			color: gray;
			margin-right: 25px;
			transition: opacity 0.3s ease-in-out;

			&:hover {
				color: red;
				font-weight: bold;
			}
		}
	}
`;

const Projects = () => {
	//#other hooks
	const navigate = useNavigate();
	const isMounted = useRef(false);

	//#immutables
	const ticketheaders = ['Ticket ID', 'Subject', 'Status'];
	const API = requests(API_BASEURL);

	//#states
	const [newTicket, setNewTicket] = useState(null);
	const [tickets, setTickets] = useState(null);
	const [members, setMembers] = useState(null);
	const [editMode, setEditMode] = useState(null);
	const [options, setOptions] = useState(null);
	const [user, setUser] = useContext(UserContext);
	const [projectOptions, setProjectOptions] = useState(null);
	const [project, setProject] = useState(null);
	const {
		selectedTicket,
		setSelectedTicket,
		currentProject,
		setCurrentProject,
		activeBtn,
		setActiveBtn,
	} = useOutletContext();

	//#get project on first render
	useEffect(() => {
		if (activeBtn !== 'projects') {
			setActiveBtn('projects');
		}

		/* 	const getProject = async () => {
			const data = await API.get(`project/`);
			await setCurrentProject(data[0]._id);
			await setProject(data[0]);
			console.log(data[0]);

			if (!selectedTicket) navigate(`/projects/${data[0]._id}`);
		};

		getProject(); */
	}, []);

	//#form handling, ticket
	useEffect(() => {
		/////todo: needs url
		/////todoo: populate fields initial value with selected ticket data
		/////todo: need Save button to get data and update selectedTicket

		//update tickets table
		const getTicket = async () => {
			const data = await API.get(`ticket/query?project=${currentProject}`);
			setTickets(data);
		};

		//get project members
		const getMembers = async () => {
			const data = await API.get(`project/${currentProject}/members`);
			setMembers(data);
		};

		//get options for form handling
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

				if (editMode === 'Ticket') {
					console.log('generating ticket options');
					options = await generateTicketOptions(selectedTicket, buttons);
				} else if (editMode === 'New Ticket') {
					console.log('generating new ticket options');
					options = await newticketOptionGenerator(newTicket, buttons);
				} else if (editMode === 'Members') {
					const allmembers = await API.get('user/query');
					options = {
						header: 'add/remove a member',
						selected: sortMembers(members, true), //2nd param is "email only" boolean
						selectables: sortMembers(allmembers, true),
						saveHandler: async (newMembers) => {
							console.log('wheel save handler executed', newMembers);
							const body = { members: newMembers };
							updateMembers(body);
							setEditMode(null);
						},
						cancelHandler: () => {
							setEditMode(null);
						},
					};
				} else if (editMode === 'Delete') {
					options = {
						confirmHandler: async () => {
							console.log('deleting ', selectedTicket._id);
							await API.del(`ticket/${selectedTicket._id}`, {
								project: selectedTicket.project,
							});
							setSelectedTicket(null);
							setEditMode(null);
						},

						cancelHandler: async () => {
							setEditMode(null);
						},
					};
				}

				console.log('setting options to ', options);
				await setOptions(options);
			} else {
				isMounted.current = true;
			}
		};

		getTicket();
		getMembers();
		getOptions();
	}, [newTicket, currentProject, editMode]);

	//#sort ticket data to be fed into List
	const sortTickets = (tickets) => {
		const ticketsCopy = [...tickets];
		return ticketsCopy.reduce((acc, cur) => {
			acc.push([
				cur._id,
				cur.subject,
				<div className="status">
					{cur.status}
					<span
						onClick={() => setEditMode('Delete')}
						className="btn-delete"
					>
						delete
					</span>
				</div>,
			]);
			return acc;
		}, []);
	};

	const sortMembers = (members, emailOnly) => {
		const membersCopy = [...members];

		return membersCopy.reduce((acc, member) => {
			if (!member.name)
				member.name = `${member.firstname} ${member.lastname}`;

			emailOnly
				? acc.push([member.email])
				: acc.push([member.name, member.email]);

			return acc;
		}, []);
	};

	//#passed to wheel component for updating members
	const updateMembers = async (value) => {
		let isDifferent;

		if (value.members.length !== members.length) {
			isDifferent = true;
		} else {
			//check current members and compare with members being passed
			for (let i = 0; i < value.members.length; i++) {
				isDifferent = true;
				if (value.members.includes(members[i].email)) isDifferent = false;
			}
		}

		if (isDifferent)
			await API.put(`project/${currentProject}/members`, value);
	};

	//#select ticket handler
	const selectTicket = async (e) => {
		const classes = [...e.target.classList];
		const row = classes.includes('status')
			? e.target.parentNode.parentNode
			: e.target.parentNode;
		const data = await API.get(`ticket/${row.id}`);
		const subject = data[0].subject;
		console.log(subject);
		navigate(
			`/projects/${currentProject}/tickets/${subject.replaceAll(' ', '-')}`
		);
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
		await setEditMode('New Ticket');
	};

	//renderModal

	return (
		<>
			{editMode ? (
				<Modal
					mode={editMode}
					options={options}
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
					<div className="project-name">
						{project ? project.name : ''}{' '}
						<div className="project-name-menu">
							<span>new</span>
							<span>edit</span>
							<span>change</span>
						</div>
					</div>
				</div>
				<div>
					<div className="members border-solid rounded">
						<div className="title">
							Members{' '}
							{project && user ? (
								<span
									className={`title-btn ${
										project.project_manager.some(
											(manager) => manager.email === user.email
										)
											? ''
											: 'hidden'
									}`}
									onClick={async () => {
										await setEditMode('Members');
									}}
								>
									edit
								</span>
							) : (
								''
							)}
						</div>
						<List
							subject={'Members'}
							colsize={3}
							headers={['Name', 'E-mail']}
							content={members ? sortMembers(members) : ''}
							attributes={{
								isSelectable: false,
								isHoverable: false,
								isScrollable: true,
							}}
						/>
					</div>
					<div className="tickets border-solid rounded">
						<div className="title">
							Tickets
							<span className="title-btn" onClick={() => createTicket()}>
								new
							</span>
						</div>
						<List
							subject={'Tickets'}
							colsize={3}
							headers={ticketheaders}
							content={tickets ? sortTickets(tickets) : ''}
							attributes={{
								isSelectable: true,
								isScrollable: true,
								isHoverable: true,
							}}
							handleClick={selectTicket}
							viewableRows={10}
							activeIndicator={selectedTicket ? selectedTicket._id : ''}
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
