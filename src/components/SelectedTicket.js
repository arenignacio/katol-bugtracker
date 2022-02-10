import { useState } from 'react';
import styled from 'styled-components';
import Comments from './Comments';

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

		div {
			display:flex;
			justify-content: space-evenly;
			align-items: center;

		&:last-of-type {			
			font-size: 1rem;
		}
		
		> span {
			display: flex:
			align-items: center;
			color: rgba(150, 0, 0, 0.6);
			padding: 2.5px;
			font-size: 0.8rem;
			font-weight: bold;
			letter-spacing: 0.5px;
			margin-left: 25px;
			

			&:hover {
			color: rgba(0, 0, 0, 0.6);
				cursor: pointer;
			}
		}}
	}

	.body {
		display: flex;
		height: 15rem;
		width: 100%;
		overflow: hidden;
		transition: height 0.5s ease-in-out, opacity 1s;

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
		background: rgba(0,0,0, 0.1);
		padding: 15px;
		border-right: 1px solid black;

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
					color: rgba(0,0,0, 0.5);
					margin-top: 2px;

					&.high-priority {						
						color: rgba(225, 0, 0, 1);
					}
				}
			}
		}
	}

	.comments-container {
		box-sizing: border-box;
		font-size: 0.9rem;
		width: 40%;
	}
`;

const SelectedTicket = ({ ticket }) => {
	const [isHidden, setIsHidden] = useState(false);

	const date = (dateStr) => {
		const date = new Date(dateStr);

		return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
	};

	return (
		<Wrapper>
			<div className="header">
				<div>{(ticket && ticket.subject) || 'Selected Ticket'}</div>
				<div>
					{(ticket && 'Last Updated: ' + date(ticket.last_updated)) || ''}
					&nbsp;
					<span
						style={{ display: ticket ? 'block' : 'none' }}
						onClick={() => {
							if (ticket) setIsHidden(!isHidden);
						}}
					>
						toggle
					</span>
				</div>
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
							<span>
								{(ticket &&
									ticket.description +
										'uuntur ipsa ad fugit magnam mollitia earum quas beatae, autem velit! Reprehenderit fugit nulla, quasi dolorum aspernatur tenetur a impedit.') ||
									''}
							</span>
						</div>
					</div>
					<div>
						<div>
							Status <span>{(ticket && ticket.status) || ''}</span>
						</div>
						<div>
							Priority{' '}
							<span
								className={
									ticket && ticket.priority === 'high'
										? 'high-priority'
										: ''
								}
							>
								{(ticket && ticket.priority) || ''}
							</span>
						</div>
						<div>
							Type <span>{(ticket && ticket.type) || ''}</span>
						</div>
					</div>

					<div>
						<div>
							{' '}
							Date Initiated
							<span>
								{(ticket && date(ticket.date_initiated)) || ''}
							</span>
						</div>
						<div>
							Initiated By
							<span>{(ticket && ticket.initiated_by.name) || ''}</span>
						</div>
						<div>
							Assigned To
							<span>{(ticket && ticket.assigned_to.name) || ''}</span>
						</div>
					</div>
				</div>
				<div className="comments-container">
					<Comments
						origin={ticket ? ticket._id : ''}
						comments={ticket ? [...ticket.comments].reverse() : ''}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

export default SelectedTicket;
