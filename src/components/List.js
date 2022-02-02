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
	}
`;

const renderHeaders = (arr) => {
	console.log(arr);

	return arr.map((el) => {
		console.log(el);

		return <div>{el}</div>;
	});
};

const List = ({ colsize, headersArr }) => {
	return (
		<Wrapper colsize={colsize}>
			<div className="list-header">{renderHeaders(headersArr)}</div>
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
		</Wrapper>
	);
};

export default List;
