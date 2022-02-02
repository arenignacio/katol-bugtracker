import styled from 'styled-components';

const Wrapper = styled.div`
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
				align-items: center;
				width: ${({ colsize }) => 100 / colsize}%;
				padding: 2px;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		&-item {
			font-size: 0.7rem;
		}
	}
`;

const List = ({ colsize, headers, content }) => {
	const renderHeaders = (arr) => {
		console.log(arr);
		return arr.map((el) => {
			return <div key={`key-${el}`}>{el}</div>;
		});
	};

	const renderContent = (arr) => {
		console.log(arr);

		return arr.map((el) => {
			return (
				<div
					className="list-item"
					key={el[0]}
					onClick={() => {
						console.log(`${el[0]} clicked`);
					}}
				>
					<div>{el[0]}</div>
					<div>{el[1]}</div>
					<div>{el[2]}</div>
				</div>
			);
		});
	};

	return (
		<Wrapper colsize={headers ? headers.length : ''}>
			<div className="list-header">
				{headers ? renderHeaders(headers) : ''}
			</div>
			<div className="list-content">
				{content ? renderContent(content) : 'Loading..'}
			</div>
		</Wrapper>
	);
};

export default List;
