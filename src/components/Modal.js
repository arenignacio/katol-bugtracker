import { useState } from 'react';
import styled from 'styled-components';
import Form from './Form';
import Wheel from './Wheel';
import Confirm from './Confirm';

const Wrapper = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90vw;
	height: 95vh;
	backdrop-filter: blur(5px);
	z-index: 4;

	.buffer-zone {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 35%;
		height: 90%;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: fit-content;
		width: fit-content;
		box-sizing: border-box;
		margin: 25px;
		padding: 25px 0px;
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 2.5px;
		z-index: 5;

		.modal-header {
			display: flex;
			justify-content: center;
			font-size: 1.5rem;
		}
	}

	.field > textarea {
		resize: none;
		min-height: 90px;
		max-height: 90px;
	}

	.error {
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(250, 0, 0, 0.5);
		font-size: 1.1rem;
	}
`;

const Modal = ({ options, onClickHandler, mode }) => {
	const [errorMsg, setErrorMsg] = useState(null);

	const renderBody = (mode) => {
		console.log(mode, options);

		if (['New Ticket', 'Ticket'].includes(mode)) {
			return (
				<Form
					options={options}
					handleErrorMsg={(input) => setErrorMsg(input)}
				></Form>
			);
		} else if (mode === 'Members') {
			return <Wheel options={options} />;
		} else if (mode === 'Delete') {
			return (
				<Confirm
					options={options}
					handleErrorMsg={(input) => setErrorMsg}
				/>
			);
		}
	};

	return (
		<Wrapper className={`background`} onClick={onClickHandler}>
			{options && mode ? (
				<div className="buffer-zone">
					<div className="container">
						<div className="modal-header">{mode}</div>
						<div className="error">{errorMsg ? errorMsg : ''}</div>

						{renderBody(mode)}
					</div>
				</div>
			) : (
				''
			)}
		</Wrapper>
	);
};

export default Modal;
