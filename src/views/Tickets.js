//#dependencies
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { API_BASEURL } from '../utils/constants';
import { UserContext } from '../App';
import requests from '../utils/requests';

//#components
import List from '../components/List';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	height: 100%;
	width: 100%;

	.tickets-container {
		width: 80%;
		margin-top: 35px;
		height: fit-content;
		max-height: 90%;
		border-radius: 5px;
		overflow: hidden;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
	}

	.title {
		display: flex;
		justify-content: center;
		font-size: 2rem;
		background: white;
	}

	.row {
		display: flex;
		padding: 5px 0px;

		&:not(.header) {
			border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		}
		&.header {
			background: rgba(0, 0, 0, 0.8);
			color: white;
			padding: 10px 0;
		}

		&:nth-of-type(even):not(.header) {
			background: rgba(0, 0, 0, 0.2);
		}

		&:hover:not(.header) {
			cursor: pointer;
			background: rgba(0, 0, 70, 0.1);
			color: brown;
		}
	}

	.col {
		box-sizing: border-box;
		width: ${({ columns }) => {
			return 100 / columns;
		}}%;

		padding: 0px 10px;
	}
`;

const Tickets = () => {
	const API = requests(API_BASEURL);
	const navigate = useNavigate();
	const { setActiveBtn, setSelectedTicket } = useOutletContext();
	const headers = ['Subject', 'Description', 'Status', 'Last Updated'];

	const [user, setUser] = useContext(UserContext);
	const [tickets, setTickets] = useState(null);

	useEffect(() => {
		const getTickets = async () => {
			const url = `ticket/query?assigned_to.email=${user.email}`;
			console.log(url);

			const data = await API.get(url);
			setTickets(data);
		};
		getTickets();
	}, []);

	const renderHeader = (headersArr) => {
		return headersArr.map((ticket) => {
			return <div className="col">{ticket}</div>;
		});
	};

	const renderTickets = (ticketsArr) => {
		return ticketsArr.map((ticket) => {
			return (
				<div
					className="row"
					onClick={() => {
						setSelectedTicket(ticket);
						setActiveBtn('projects');
						navigate(`/projects/${ticket.project}/tickets/${ticket._id}`);
					}}
				>
					<div className="col">{ticket.subject}</div>
					<div className="col description">{ticket.description}</div>
					<div className="col ">{ticket.status}</div>
					<div className="col ">{ticket.last_updated.date}</div>
				</div>
			);
		});
	};

	return (
		<>
			<Wrapper columns={headers.length}>
				{tickets ? (
					<div className="tickets-container">
						<div className="title">All tickets</div>
						<div className="content-container">
							<div className="row header"> {renderHeader(headers)}</div>

							{renderTickets(tickets)}
						</div>
					</div>
				) : (
					'Loading...'
				)}
			</Wrapper>
		</>
	);
};

export default Tickets;
