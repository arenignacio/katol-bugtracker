import { useState } from 'react';
import styled from 'styled-components';

//todo: add fillers to rows

const Wrapper = styled.div`
	box-sizing: border-box;
	border: 1px solid black;
	width: 100%;
	min-width: 400px;
	overflow: hidden;
	min-height: 
	max-height: 100%;

	.list {
		&-header {
			height: 5%;
			background: lightgreen;
			border-bottom: 1px solid rgba(0, 0, 0, 0.5);
		}

		&-content {
			overflow-y: auto;
			max-height: ${({ viewableRows }) => {
				let rowSize = 20; //pixels
				let total = 10 * rowSize;

				if (viewableRows)
					total = viewableRows < 10 ? viewableRows * rowSize : total;

				return total;
			}}px;

			&::-webkit-scrollbar {
				width: 5px;
			}

			&::-webkit-scrollbar-track {
				border-radius: 5px;
				background: rgba(0, 0, 0, 0.5);
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background: lightblue;
			}
		}

		&-header,
		&-item {
			display: flex;
			align-items: center;

			div,
			span {
				height: 1rem;
				text-align: center;
				width: ${({ colsize }) => 100 / colsize}%;
				padding: 4px 0px 0px 0px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		&-item {
			font-size: 0.7rem;

			&:nth-of-type(odd) {
				background: rgba(0, 0, 0, 0.2);
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

			&.active {
				background: lightblue;
			}
		}
	}

`;

const List = ({
	headers,
	content,
	attributes = {
		isSelectable: false,
		isHoverable: false,
	},
	handleClick,
	viewableRows,
}) => {
	//#states
	const [activeItem, setActiveItem] = useState();

	const renderHeaders = (arr) => {
		return arr.map((el) => {
			return <div key={`key-${el}`}>{el}</div>;
		});
	};

	const renderRows = (arr) => {
		return arr.map((row) => {
			const contents = row.map((col) => {
				return <span>{col}</span>;
			});

			return (
				<div
					className={`list-item ${activeItem === row[0] ? 'active' : ''}`}
					id={row[0]}
					key={row[0]}
					onClick={(e) => {
						console.log(`${row[0]} clicked`);
						if (attributes.isSelectable) setActiveItem(row[0]);
						if (handleClick) handleClick(e);
					}}
				>
					{contents}
				</div>
			);
		});
	};

	const fillRows = (arr, number) => {
		if (arr.length >= number) {
			return;
		}

		let fillerRows = new Array(number - arr.length);
		console.log(fillerRows.length);
		return fillerRows.map(() => {
			return <div className="list-item"></div>;
		});
	};

	return (
		<Wrapper
			colsize={headers ? headers.length : ''}
			isSelectable={attributes.isSelectable}
			isHoverable={attributes.isHoverable}
			viewableRows={viewableRows}
		>
			<div className="list-header">
				{headers ? renderHeaders(headers) : ''}
			</div>
			<div className="list-content">
				{content ? renderRows(content) : 'Loading..'}
				{content ? fillRows(content, 15) : ''}
			</div>
		</Wrapper>
	);
};

export default List;
