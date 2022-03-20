import { useEffect, useState } from 'react';
import styled from 'styled-components';

//todo: add fillers to rows

const Wrapper = styled.div`
	width: 100%;
	min-width: 300px;
	overflow: hidden;
	max-height: 100%;

	.list {
		&-header {
			height: 5%;
			background: gray;
			border-bottom: 1px solid rgba(0, 0, 0, 0.5);
		}

		&-content {
			overflow-y: auto;
			height: ${({ viewableRows }) => {
				let rowSize = 20; //pixels
				let total = ((viewableRows < 10 && viewableRows) || 10) * rowSize;

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

			div.row,
			span.col {
				width: ${({ colsize }) => 100 / colsize}%;
				padding: 2px 0px 2px 10px;
				${({ isExpandable }) =>
					!isExpandable
						? `height: 1rem;
						overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;`
						: 'min-height: 1rem;'}
			}

			span.col {
				padding: 4px 0px 0px 10px;
			}
		}
		&-item {
			font-size: 0.7rem;
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);

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
		isExpandable: false,
	},
	handleClick,
	viewableRows = 10,
	activeIndicator,
}) => {
	//#states
	const [activeItem, setActiveItem] = useState();

	useEffect(() => {
		console.log('active indicator effect acctivated');
		setActiveItem(activeIndicator);
	}, [activeIndicator]);

	const renderHeaders = (arr) => {
		return arr.map((el, idx) => {
			return (
				<div className="row" key={el + idx}>
					{el}
				</div>
			);
		});
	};

	//each element is a row, each subelement is a column
	//[[col, col, col], [col, col, col]]
	const renderRows = (arr) => {
		return arr.map((row, idx) => {
			const contents = row.map((col, idx) => {
				return (
					<span key={col + idx} className="col">
						{col}
					</span>
				);
			});

			return (
				<div
					className={`list-item row ${
						activeItem === row[0] ? 'active' : ''
					}`}
					id={row[0]}
					key={row[0] + idx}
					onClick={(e) => {
						if (attributes.isSelectable && !activeIndicator)
							setActiveItem(row[0]);
						if (handleClick) handleClick(e);
					}}
				>
					{contents}
				</div>
			);
		});
	};

	const fillRows = (arr, viewableRows) => {
		if (arr.length >= viewableRows) {
			return;
		}

		let fillerRows = new Array(viewableRows - arr.length).fill('');
		const rows = fillerRows.map((el, idx) => {
			return (
				<div key={`filler-row-${idx}`} className="list-item row">
					<span className="col"></span>
				</div>
			);
		});

		return rows;
	};

	return (
		<Wrapper
			colsize={headers ? headers.length : ''}
			isSelectable={attributes.isSelectable}
			isHoverable={attributes.isHoverable}
			isExpandable={attributes.isExpandable}
			viewableRows={viewableRows}
		>
			<div className="list-header">
				{headers ? renderHeaders(headers) : ''}
			</div>
			<div className="list-content">
				{content ? renderRows(content) : 'Loading..'}
				{content ? fillRows(content, viewableRows) : ''}
			</div>
		</Wrapper>
	);
};

export default List;
