import { useState } from 'react';
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

			&:nth-of-type(odd) {
				background: rgba(0, 0, 0, 0.2);

				&.active {
					background: rgba(0, 0, 70, 0.3);
				}
			}

			${({ isHoverable }) => {
				if (isHoverable)
					return `&:hover {
						cursor: pointer;
						background: rgba(0, 0, 70, 0.1);
					}`;
			}}

			${({ isSelectable }) => {
				if (isSelectable)
					return `&:active {
				background: rgba(0, 0, 70, 0.4);
				}`;
			}}
		}
	}

	.active {
		background: rgba(0, 0, 70, 0.3);
	}
`;

const List = ({
	colsize,
	headers,
	content,
	attributes = { isSelectable: false, isHoverable: false },
	handleClick,
}) => {
	//#states
	const [activeItem, setActiveItem] = useState();

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
					className={`list-item ${activeItem === el[0] ? 'active' : ''}`}
					id={el[0]}
					key={el[0]}
					onClick={(e) => {
						console.log(`${el[0]} clicked`);
						if (attributes.isSelectable) setActiveItem(el[0]);
						if (handleClick) handleClick(e);
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
		<Wrapper
			colsize={headers ? headers.length : ''}
			isSelectable={attributes.isSelectable}
			isHoverable={attributes.isHoverable}
		>
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
