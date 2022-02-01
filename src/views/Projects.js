import styled from 'styled-components';

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
		padding: 15px;

		.ticket-body {
			width: 65%;
			padding: 0px 25px;
			box-sizing: border-box;

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

const List = styled.div`
	box-sizing: border-box;
	border: 1px solid black;
	width: 40%;
	min-width: 500px;
	height: 250px;
	margin-left: 15px;

	.list {
		&-header {
			background: lightgreen;
		}

		&-item:nth-of-type(odd) {
			background: rgba(0, 0, 0, 0.4);
		}

		&-header,
		&-item {
			display: flex;

			div {
				display: flex;
				height: 1rem;
				justify-content: center;
				width: ${({ colsize }) => 100 / colsize}%;
				padding: 2px;
				white-space: nowrap;
				text-overflow: ellipsis;
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
				<List colsize={3}>
					<div className="list-header">
						<div>ticket id</div>
						<div>description</div>
						<div>assigned to</div>
					</div>
					<div className="list-content">
						<div className="list-item">
							<div>0u1j2dni892</div>
							<div>There's a snake in my boot 1231412</div>
							<div>aign123</div>
						</div>
						<div className="list-item">
							<div>0u1j2dni892</div>
							<div>There's a snake in my boot 1231412</div>
							<div>aign123</div>
						</div>
						<div className="list-item">
							<div>0u1j2dni892</div>
							<div>There's a snake in my boot 1231412</div>
							<div>aign123</div>
						</div>
						<div className="list-item">
							<div>0u1j2dni892</div>
							<div>There's a snake in my boot 1231412</div>
							<div>aign123</div>
						</div>
						<div className="list-item">
							<div>0u1j2dni892</div>
							<div>There's a snake in my boot 1231412</div>
							<div>aign123</div>
						</div>
						<div className="list-item">
							<div>0u1j2dni892</div>
							<div>There's a snake in my boot 1231412</div>
							<div>aign123</div>
						</div>
					</div>
				</List>
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
