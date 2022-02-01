import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100%;

	> div {
		display: flex;
		flex-direction: column;
		align-items: center;
		boxsizing: border-box;
		min-height: 50%;

		background: lightgreen;
	}

	.title {
		display: flex;
		justify-content: center;
		width: 100%;
		margin: 20px 0px;
		font-size: 2rem;
	}

	.cards-container {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
	}

	.card {
		height: 250px;
		width: 300px;
		background: pink;

		.card-name {
			display: flex;
			justify-content: center;
			boxsizing: border-box;
			height: 10%;
		}

		.card-content {
			height: 90%;
			background: brown;
		}
	}

	.recent-activity {
		min-height: 50px;
		width: 80%;
		background: lightblue;

		th,
		td {
			padding: 5px 10px;
		}
	}

	.author-col,
	.date-col {
		text-align: center;
		width: 15%;
	}

	.action-col {
		width: 85%;
		text-align: center;
	}
`;

const Dashboard = () => {
	return (
		<Wrapper>
			<div>
				<div className="title">Dashboard</div>
				<div className="cards-container">
					<div className="card">
						<div className="card-name">Completed</div>
						<div className="card-content"></div>
					</div>
					<div className="card">
						<div className="card-name">In Progress</div>
						<div className="card-content"></div>
					</div>
					<div className="card">
						<div className="card-name">Past Due</div>
						<div className="card-content"></div>
					</div>
				</div>
			</div>
			<div>
				<table className="recent-activity">
					<thead>
						<th className="action-col">Action</th>
						<th className="author-col">Author</th>
						<th className="date-col">Date</th>
					</thead>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
					<tr>
						<td className="action-col">
							Changed ticket123 status to completed
						</td>
						<td className="author-col">edsign</td>
						<td className="date-col">1/31/2022</td>
					</tr>
				</table>
			</div>
		</Wrapper>
	);
};

export default Dashboard;
