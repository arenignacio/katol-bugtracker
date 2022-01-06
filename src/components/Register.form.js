import styled from 'styled-components';

const Wrapper = styled.div`
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;

		#errorMsg {
			width: 100%;
			margin-bottom: 15px;
			padding: 2.5px;
			font-size: 20px;
			text-align: center;
			border-radius: 3px;
			color: #d8000c;
			background-color: #ffd2d2;
		}

		input[type='text'],
		input[type='password'] {
			width: 225px;
			height: 1.5rem;
			margin-bottom: 10px;
			border-radius: 5px;
			outline: none;
			padding: 0px 10px;
			border: 1px solid rgba(0, 0, 0, 0.3);
		}

		input[type='submit'] {
			letter-spacing: 0.5px;
			font-size: 18px;
			height: 35px;
			width: 150px;
			margin: 10px 0px;
			font-family: 'Mukta', sans-serif;
			font-weight: bold;
			color: rgba(0, 0, 0, 0.7);
			background: hsla(190, 40%, 70%, 0.7);
			border: 0.5px solid rgba(0, 0, 250, 0.5);
			border-radius: 5px;

			&:hover {
				color: rgba(0, 0, 0, 0.9);
				background: hsla(190, 60%, 70%, 1);
				cursor: pointer;
			}

			&:active {
				color: white;
				background: hsla(195, 100%, 40%, 1);
			}
		}
	}
`;

const RegisterForm = ({ handleFormChange }) => {
	const onClickLogin = (e) => {
		e.preventDefault();
		handleFormChange();
	};

	return (
		<Wrapper>
			{' '}
			<form>
				<input type="text" id="" />{' '}
				<div id="register-prompt">
					<span>Already have an account?</span>&nbsp;
					<span onClick={onClickLogin}>Sign In</span>.
				</div>
			</form>
		</Wrapper>
	);
};

export default RegisterForm;
