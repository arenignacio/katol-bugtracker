import { useState } from 'react';
import styled from 'styled-components';

//todo: Make collapsable when no ticket is selected or pick default ticket.

const Wrapper = styled.div`
	width: 100%;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.8rem;
		font-size: 1.2rem;
		background: white;
		padding: 0px 20px;
	}

	.body {
		display: flex;
		height: 15rem;
		width: 100%;
		background: pink;
		overflow: hidden;
		transition: height 0.5s ease-in-out, opacity 0.5s;

		&.hidden {
			height: 0px;
			opacity: 0%;
		}
	}

	.ticket-details {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 60%;
		background: lightgreen;
		padding: 15px;

		> div {
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;

			div {
				display: flex;
				flex-direction: column;
				margin-left: 20px;
				width: 25%;
				font-size: 0.9rem;

				&.description {
					margin-left: 35px;
					width: 60%;
				}

				span {
					max-width: 100%;
					font-size: 0.8rem;
				}
			}
		}
	}

	.comments {
		width: 40%;
		background: lightblue;
	}
`;

const SelectedTicket = ({ ticket }) => {
	const [isHidden, setIsHidden] = useState(false);

	return (
		<Wrapper>
			<div className="header">
				<span>{(ticket && ticket.subject) || 'Selected Ticket'}</span>
				<span>
					{(ticket && 'Last Updated: ' + ticket.last_updated) || ''}
					&nbsp;
					<span
						onClick={() => {
							if (ticket) setIsHidden(!isHidden);
						}}
					>
						Hide
					</span>
				</span>
			</div>

			<div
				className={`body ${isHidden ? 'hidden ' : ''} ${
					ticket ? '' : 'hidden'
				}`}
			>
				<div className="ticket-details">
					<div>
						<div>
							Ticket ID <span>{(ticket && ticket._id) || ''}</span>
						</div>
						<div className="description">
							Description{' '}
							<span>{(ticket && ticket.description) || ''}</span>
						</div>
					</div>
					<div>
						<div>
							Status <span>{(ticket && ticket.status) || ''}</span>
						</div>
						<div>
							{' '}
							Initiated By
							<span>{(ticket && ticket.initiated_by.name) || ''}</span>
						</div>
						<div>
							{' '}
							Assigned To
							<span>{(ticket && ticket.assigned_to.name) || ''}</span>
						</div>
					</div>

					<div>
						<div>
							Test<span>test</span>
						</div>
						<div>
							stat<span>test</span>
						</div>
						<div>
							stat<span>test</span>
						</div>
					</div>
				</div>
				<div className="comments"></div>
			</div>
		</Wrapper>
	);
};

export default SelectedTicket;
