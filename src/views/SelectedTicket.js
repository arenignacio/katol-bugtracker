import styled from 'styled-components';

//todo: Make collapsable when no ticket is selected or pick default ticket.

const Wrapper = styled.div`
	height: 100%;
	width: 100%;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 15%;
		font-size: 1.3rem;
		background: white;
		padding: 0px 20px;
	}

	.body {
		display: flex;
		height: 85%;
		width: 100%;
		background: pink;

		&.hidden {
			display: none;
		}
	}

	.ticket-details {
		width: 60%;
		background: lightgreen;
		padding: 15px;

		> div {
			display: flex;
			height: 50%;
			box-sizing: border-box;

			div {
				display: flex;
				flex-direction: column;
				margin-left: 20px;
				width: 25%;
				font-size: 0.9rem;

				&.description {
					margin-left: 35px;
					width: 65%;
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
	return (
		<Wrapper>
			<div className="header">
				<span>{(ticket && ticket.subject) || 'Selected Ticket'}</span>
				<span>{ticket ? 'Last Updated: ' + ticket.last_updated : ''}</span>
			</div>
			{ticket ? (
				<>
					<div className="body ">
						<div className="ticket-details">
							<div>
								<div>
									Ticket ID <span>{ticket._id}</span>
								</div>
								<div className="description">
									Description{' '}
									<span>
										Lorem ipsum dolor sit amet consectetur adipisicing
										elit. Sint quo dolores voluptate commodi enim
										beatae labore corporis exercitationem soluta omnis
										provident consequatur vero culpa error,
										reprehenderit perspiciatis inventore nemo saepe!
									</span>
								</div>
							</div>
							<div>
								<div>
									{' '}
									Initiated By
									<span>{ticket.initiated_by.name}</span>
								</div>
								<div>
									{' '}
									Assigned To
									<span>{ticket.assigned_to.name}</span>
								</div>
								<div>
									<span></span>
								</div>
							</div>
						</div>
						<div className="comments"></div>
					</div>
				</>
			) : (
				''
			)}
		</Wrapper>
	);
};

export default SelectedTicket;
