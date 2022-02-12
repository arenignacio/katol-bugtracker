import styled from 'styled-components';
import Form from './Form';

const Wrapper = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90vw;
	height: 95vh;
	backdrop-filter: blur(1.5px);
	z-index: 4;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: fit-content;
		width: 25%;
		box-sizing: border-box;
		padding: 25px;
		box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 2.5px;
		z-index: 5;

		.modal-header {
			display: flex;
			justify-content: center;
			margin-bottom: 30px;
			font-size: 1.5rem;
		}
	}

	.field > textarea {
		resize: none;
		min-height: 90px;
		max-height: 90px;
	}

	&.hidden {
		display: none;
	}
`;

const Modal = ({ options, editMode, onClickHandler }) => {
	console.log(options);

	return (
		<Wrapper
			className={`background ${editMode ? '' : 'hidden'}`}
			onClick={onClickHandler}
		>
			<div className="container">
				<div className="modal-header">Ticket</div>
				{options ? (
					<Form
						options={options}
						handleErrorMsg={(input) => console.log(input)}
					></Form>
				) : (
					''
				)}
			</div>
		</Wrapper>
	);
};

export default Modal;
