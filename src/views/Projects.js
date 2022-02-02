import styled from 'styled-components';

//#components
import List from '../../src/components/List';

const Wrapper = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 25px;
	background: rgba(0, 0, 0, 0.1);
	overflow-y: scroll;

	> div {
		box-sizing: border-box;
		padding: 15px;
		display: flex;
		justify-content: space-evenly;
		height: 45%;
		width: 100%;
	}

	.project-name {
		font-size: 2.7rem;
		height: 10%;
		margin: 40px 15px;
	}

	.selected-ticket {
		max-height: 95%;
		width: 90%;
		border: 1px solid black;
	}

	.selected-ticket {
		display: flex;

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
	}
`;

const Projects = () => {
	return (
		<Wrapper>
			<span className="project-name">Project 1</span>
			<div>
				<List colsize={3}>
					<div className="list-header">
						<div>name</div>
						<div>phone</div>
						<div>e-mail</div>
					</div>
					<div className="list-content">
						<div className="list-item">
							<div>Aren Ignacio</div>
							<div>(123) 457-9999</div>
							<div>aign123@email.com</div>
						</div>
					</div>
				</List>
				<List
					colsize={3}
					headersArr={['Ticket ID', 'Description', 'Assigned To']}
				/>
			</div>
			<div>
				<div className="selected-ticket">
					<div className="ticket-body">
						<div className="ticket-body-l1">
							<div className="ticket-id">Ticket ID</div>
							<div className="ticket-description">
								Description{' '}
								<span>
									Lorem ipsum dolor sit amet, consectetur adipisicing
									elit. Exercitationem, corrupti debitis! Commodi aut
									et eligendi quas, corrupti, sapiente corporis
									delectus soluta animi hic qui! Saepe inventore minima
									in asperiores iste.
								</span>
							</div>
						</div>
						<div className="ticket-body-l2">
							<div className="ticket-author">
								Submitted By <span>Aren Ignacio</span>
							</div>
							<div className="ticket-assignee">Assigned to</div>
							<div className="ticket-status">Status</div>
						</div>
					</div>
					<div className="ticket-comments">
						<div className="comments">Comments</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Projects;
