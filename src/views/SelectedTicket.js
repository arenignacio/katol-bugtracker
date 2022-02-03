import styled from 'styled-components';

//todo: Make collapsable when no ticket is selected or pick default ticket.

const Wrapper = styled.div`
	height: 100%;
	width: 100%;

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 15%;
		font-size: 1.3rem;
		background: white;
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

		> div {
			height: 50%;
			box-sizing: border-box;
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
			<div className="header">Selected Ticket</div>
			{ticket ? (
				<>
					<div className="body ">
						<div className="ticket-details">
							<div></div>
							<div></div>
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
