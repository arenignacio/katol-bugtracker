import { useState } from 'react';

import { API_BASEURL } from '../utils/constants';

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
		input[type='password'],
		input[type='email'] {
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

const LoginForm = ({
	inputFields,
	handleLogin,
	handleFormChange,
	fetchData,
}) => {
	const [errorMsg, setErrorMsg] = useState('');
	const [loginForm, setLoginForm] = useState(inputFields[0]);

	const handleInputChange = (e) => {
		setLoginForm((prevState) => {
			const id = e.target.id;
			return { ...prevState, [id]: e.target.value };
		});
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		let data;

		//?fetchData is data to be fed into fetch command
		fetchData[1].body = JSON.stringify(loginForm);
		data = await fetch(fetchData[0], fetchData[1]);

		if (data.ok) {
			if (typeof handleLogin === 'function') handleLogin(data.ok);
		} else {
			setErrorMsg('Invalid email/password');
		}

		console.log(fetchData, data);
	};

	const onClickRegister = (e) => {
		e.preventDefault();
		handleFormChange();
	};

	const renderFields = (fields, placeholders = []) => {
		const fieldsArr = Object.entries(fields);

		return fieldsArr.map((field, idx) => {
			let type = 'text';
			const placeholder =
				placeholders.length > 0 ? placeholders[idx] : field[0];

			switch (field[0]) {
				case 'password':
					type = 'password';
					break;
				case 'email':
					type = 'email';
					break;
				default:
					break;
			}

			return (
				<input
					type={type}
					id={field[0]}
					placeholder={placeholder}
					onChange={handleInputChange}
					value={loginForm[field[0]]}
				/>
			);
		});
	};

	return (
		<Wrapper>
			<form onSubmit={onSubmitHandler}>
				{errorMsg ? <div id="errorMsg">{errorMsg}</div> : ''}
				{renderFields(inputFields[0], inputFields[1])}
				<input type="submit" value="Log In" />
			</form>
			<div id="register-prompt">
				<span>Don't have an account yet?</span>&nbsp;
				<span onClick={onClickRegister}>Register</span>.
			</div>
		</Wrapper>
	);
};

export default LoginForm;
