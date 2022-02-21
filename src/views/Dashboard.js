import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100%;

	> div {
		display: flex;
		flex-direction: column;
		align-items: center;
		boxsizing: border-box;
		min-height: 50%;
		background: background: rgba(0, 0, 0, 0.1);

		&:first-of-type {
			justify-content: center;
		}
	}



	.cards-container {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
	}

	.card {
		height: 200px;
		width: 350px;
		background: pink;

		.card-name {
			display: flex;
			justify-content: center;
			boxsizing: border-box;
			height: 10%;
		}

		.card-content {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 90%;
			background: brown;
			font-size: 10rem;
		
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

		th {
			background: gray;
			color: white;
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
	const { user, activeBtn, setActiveBtn } = useOutletContext();

	useEffect(() => {
		if (activeBtn !== 'dashboard') {
			setActiveBtn('dashboard');
		}
	}, []);

	return (
		<Wrapper>
			This is dashboard. It's currently non-functional and exists to give the
			user a vision of what's to come.
			<div>
				<div className="cards-container">
					<div className="card">
						<div className="card-name">Completed</div>
						<div className="card-content">12</div>
					</div>
					<div className="card">
						<div className="card-name">In Progress</div>
						<div className="card-content">3</div>
					</div>
					<div className="card">
						<div className="card-name">Past Due</div>
						<div className="card-content">0</div>
					</div>
				</div>
			</div>
			<div>
				<table className="recent-activity">
					<thead>
						<tr>
							<th className="action-col">Action</th>
							<th className="author-col">Author</th>
							<th className="date-col">Date</th>
						</tr>
					</thead>
					<tbody>
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
					</tbody>
				</table>
			</div>
		</Wrapper>
	);
};

export default Dashboard;
