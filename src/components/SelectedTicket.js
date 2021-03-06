import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as Edit } from '../assets/img/pencil-sharp.svg';

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
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			&:last-of-type {
				font-size: 1rem;
			}

			span {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.5rem;
				font-weight: bold;
				border: 1px solid rgba(0, 0, 0, 0.3);
				height: 13px;
				width: 15px;
				margin-left: 5px;
				user-select: none;

				&:hover {
					cursor: pointer;
				}

				&:active {
					border: 1px solid rgba(0, 0, 0, 1);
				}
			}
		}
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
		background: rgba(0, 0, 0, 0.1);
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
					color: rgba(0, 0, 0, 0.5);
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

	div span.disabled {
		color: rgba(0, 0, 0, 0.3);
		fill: rgba(0, 0, 0, 0.3);

		&:hover {
			cursor: default;
		}

		&:active {
			border: 1px solid rgba(0, 0, 0, 0.3);
		}
	}
`;

const SelectedTicket = ({ handleEdit, ticket }) => {
	useEffect(() => {
		console.log('selectedticket.js re/rendered');
	});

	const [isHidden, setIsHidden] = useState(false);

	const date = (dateStr) => {
		const date = new Date(dateStr);
		const hours = [
			'00',
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
			'08',
			'09',
			'10',
			'11',
			'12',
			'13',
			'14',
			'15',
			'16',
			'17',
			'18',
			'19',
			'20',
			'21',
			'22',
			'23',
		];

		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const month = months[date.getMonth()];
		const day = date.getDate();
		const year = date.getFullYear();
		const hour = hours[date.getHours()];
		const minutes =
			date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

		return `${month} ${day}, ${year} - ${hour}:${minutes}`;
	};

	return (
		<Wrapper>
			<div className="header">
				<div>{(ticket && ticket.subject) || 'Selected Ticket'}</div>
				<div>
					{(ticket && 'Last Updated: ' + date(ticket.last_updated.date)) ||
						''}
					&nbsp;
					<span
						className={ticket ? '' : 'disabled'}
						onClick={() => {
							if (ticket) setIsHidden(!isHidden);
						}}
					>
						-
					</span>
					<span
						className={ticket ? '' : 'disabled'}
						onClick={() => {
							if (ticket) handleEdit('Ticket');
						}}
					>
						<Edit width={15} />
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
							<span>{(ticket && ticket.description) || ''}</span>
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
