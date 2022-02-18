//#dependencies
import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { API_BASEURL } from '../utils/constants';
import { UserContext } from '../App';
import requests from '../utils/requests';

//#components
import List from '../components/List';

const Wrapper = styled.div``;

const Tickets = () => {
	const API = requests(API_BASEURL);

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

	const sortTickets = (tickets) => {
		const ticketsCopy = [...tickets];
		return ticketsCopy.reduce((acc, cur) => {
			acc.push([cur._id, cur.subject, cur.status]);

			return acc;
		}, []);
	};

	return (
		<>
			<Wrapper>
				{tickets ? (
					<List
						headers={['id', 'subject', 'status']}
						content={sortTickets(tickets)}
					></List>
				) : (
					'Loading...'
				)}
			</Wrapper>
		</>
	);
};

export default Tickets;
