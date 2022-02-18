import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100%;
	width: 250px;
	display: flex;
	justify-content: space-around;
	padding: 25px;

	button {
		height: 30px;
		width: 60px;
		border-radius: 5px;
		border: 0;
		background: rgba(0, 0, 0, 0.2);

		&:first-of-type {
			color: red;
			border: 1px solid rgba(150, 0, 0, 0.5);
			background: hsla(350, 50%, 50%, 0.5);

			&:hover {
				background: hsla(350, 80%, 50%, 0.5);
			}
		}
		&:hover {
			cursor: pointer;
			background: rgba(0, 0, 0, 0.4);
		}
	}
`;

const Confirm = ({ options, handleErrorMsg }) => {
	const { confirmHandler, cancelHandler } = options;

	return (
		<Wrapper>
			<button
				onClick={() => {
					try {
						confirmHandler();
					} catch (err) {
						handleErrorMsg('Unauthorized Action');
					}
				}}
			>
				Yes
			</button>
			<button
				onClick={() => {
					try {
						cancelHandler();
					} catch (err) {
						handleErrorMsg('Unauthorized Action');
					}
				}}
			>
				No
			</button>
		</Wrapper>
	);
};

export default Confirm;
