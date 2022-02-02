import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	height: 100%;
	width: 100%;

	.ticket-body {
		width: 65%;
		padding: 15px 25px;
		box-sizing: border-box;
		background: lightblue;

		&-l1,
		&-l2 {
			display: flex;
			height: 50%;

			div {
				display: flex;
				flex-direction: column;
				margin-right: 50px;
				font-size: 0.9rem;

				span {
					font-size: 0.8rem;
				}
			}
		}
	}
`;

const SelectedTicket = ({ ticket }) => {
	return (
		<Wrapper>
			{ticket ? (
				<>
					<div className="ticket-body">
						<div className="ticket-body-l1">
							<div className="ticket-id">
								Ticket ID <span>{ticket._id}</span>
							</div>
							<div className="ticket-description">
								Description <span>{ticket.description}</span>
							</div>
						</div>
						<div className="ticket-body-l2">
							<div className="ticket-author">
								Submitted By <span>{ticket.initiated_by.name}</span>
							</div>
							<div className="ticket-assignee">
								Assigned to <span>{ticket.assigned_to.name}</span>
							</div>
							<div className="ticket-status">
								Status
								<span>{ticket.status}</span>
							</div>
						</div>
					</div>
					<div className="ticket-comments">
						<div className="comments">Comments</div>
					</div>
				</>
			) : (
				''
			)}
		</Wrapper>
	);
};

export default SelectedTicket;
