import { useEffect, useState } from 'react';
import styled from 'styled-components';
import List from './List';

const Wrapper = styled.div`
	background: white;
	width: 100%;

	.title {
		display: flex;
		justify-content: center;
		font-size: 1.2rem;
		color: hsla(200, 50%, 50%, 0.5);
		margin: 10px 0px;
	}

	.selected {
		display: flex;
		justify-content: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.8rem;

		&:hover {
			cursor: pointer;
			color: red;
		}

		&-container {
			align-items: center;
			max-height: 150px;
			overflow: auto;
			margin: 10px 0px;
			padding: 25px 0px;

			&::-webkit-scrollbar {
				width: 5px;
			}

			&::-webkit-scrollbar-track {
				border-radius: 5px;
				background: rgba(0, 0, 0, 0.5);
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background: lightgreen;
			}
		}
	}

	.row,
	.col {
		display: flex;
		justify-content: center;
	}

	div.list {
		&-header {
			height: 25px;
			font-weight: bold;
			background: rgba(0, 0, 0, 0.8);
			color: wheat;
		}

		&-content {
			height: 275px;

			.col {
				&:hover {
					color: rgba(0, 100, 0, 0.8);
					font-weight: bold;
				}
			}
		}
	}

	.row {
		padding: 5px 0px;
	}

	.button-grp {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
		color: rgba(0, 0, 0, 0.8);

		.button {
			&:hover {
				cursor: pointer;
				font-weight: bold;
			}

			&.save:active {
				color: rgba(0, 150, 0, 0.6);
			}

			&.cancel:active {
				color: rgba(150, 0, 0, 0.6);
			}
		}
	}
`;

const Wheel = ({ options }) => {
	//needs to flatten selected to prepare for post request
	//filter selectables to not include already selected

	console.log('wheel options is ', options);
	const { selected, selectables, saveHandler, cancelHandler } = options;

	const [currentSelected, setCurrentSelected] = useState([...selected]);
	const [currentSelectables, setCurrentSelectables] = useState([
		...selectables,
	]);
	const [payload, setPayload] = useState(null);

	useEffect(() => {
		//flatten selected into array of strings instead of array of array
		//filter selectables to exclude selected
		const flattenedSelected = selected.map((select) => select[0]);
		const filteredSelectables = selectables.filter(
			(selectable) => !flattenedSelected.includes(selectable[0])
		);

		setPayload(flattenedSelected);
		setCurrentSelectables(filteredSelectables);
	}, [selected, selectables]);

	useEffect(() => {
		console.log(payload);
	});

	const renderSelected = (currentSelected) => {
		return currentSelected.map((select) => {
			return (
				<div
					className="selected"
					onClick={(e) => {
						const email = e.target.innerText;
						setCurrentSelectables((prevVal) => {
							return [...prevVal, [email]];
						});
						setCurrentSelected((prevVal) => {
							return prevVal.filter((val) => !val.includes(email));
						});
						setPayload((prevVal) =>
							prevVal.filter((payload) => payload !== email)
						);
					}}
					key={'selected ' + select}
				>
					{select}
				</div>
			);
		});
	};

	return (
		<Wrapper>
			<div className="selected-container">
				{' '}
				{currentSelected ? renderSelected(currentSelected) : ''}
			</div>
			<List
				headers={['add/remove a member']}
				content={currentSelectables ? currentSelectables : ''}
				attributes={{
					isSelectable: false,
					isHoverable: true,
					isScrollable: true,
					isExpandable: false,
				}}
				handleClick={(e) => {
					const email = e.target.parentNode.id;
					setCurrentSelected((prevVal) => {
						return [[email], ...prevVal];
					});
					setCurrentSelectables((prevVal) => {
						return prevVal.filter((val) => !val.includes(email));
					});
					setPayload((prevVal) => [...prevVal, email]);
				}}
			/>
			<div className="button-grp">
				<div
					className="button save"
					onClick={(e) => {
						console.log('save clicked');
						saveHandler(payload);
					}}
				>
					save
				</div>
				<div className="button cancel" onClick={cancelHandler}>
					cancel
				</div>
			</div>
		</Wrapper>
	);
};

export default Wheel;
