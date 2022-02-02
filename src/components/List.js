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

const List = ({ colsize, headersArr, content }) => {
	const renderHeaders = (arr) => {
		console.log(arr);
		return arr.map((el) => {
			return <div key={`key-${el}`}>{el}</div>;
		});
	};

	const renderContent = (arr) => {
		console.log(arr);

		return arr.map((el) => {
			console.log(el.assigned_to.name);

			return (
				<div className="list-item" key={el._id}>
					<div>{el._id}</div>
					<div>{el.description}</div>
					<div>{el.assigned_to.name}</div>
				</div>
			);
		});
	};

	return (
		<Wrapper colsize={colsize}>
			<div className="list-header">
				{headersArr ? renderHeaders(headersArr) : ''}
			</div>
			<div className="list-content">
				{content ? renderContent(content) : ''}
			</div>
		</Wrapper>
	);
};

export default List;
