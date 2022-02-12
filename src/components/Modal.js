import styled from 'styled-components';

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
		width: 30%;
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

	&.hidden {
		display: none;
	}
`;

const Modal = () => {
	return <Wrapper></Wrapper>;
};

export default Modal;
