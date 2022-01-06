import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const LoginForm = ({ handleLogin, handleFormChange }) => {
	const [errorMsg, setErrorMsg] = useState('');

	/* useEffect(() => {
		fetch(`${API_BASEURL}/user/amIloggedIn`)
			.then(async (response) => response.json())
			.then((isLoggedIn) => {
				if (isLoggedIn) handleLogin(isLoggedIn);
			});
	}, [handleLogin]); */

	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setLoginForm((prevState) => {
			const id = e.target.id;
			return { ...prevState, [id]: e.target.value };

			/* 	return e.target.id === 'email'
				? { ...prevState, email: e.target.value }
				: { ...prevState, password: e.target.value }; */
		});
	};

	const onSubmitLogin = (e) => {
		e.preventDefault();

		fetch(`${API_BASEURL}/user/login`, {
			method: 'Post',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(loginForm),
		}).then((response) => {
			if (response.ok) {
				handleLogin(response.ok);
			} else {
				setErrorMsg('Invalid email/password');
			}
		});
	};

	const onClickRegister = (e) => {
		e.preventDefault();
		handleFormChange();
	};

	return (
		<Wrapper>
			<form onSubmit={onSubmitLogin}>
				{errorMsg ? <div id="errorMsg">{errorMsg}</div> : ''}
				<input
					type="text"
					id="email"
					placeholder="enter email"
					onChange={handleChange}
					value={loginForm.email}
				/>
				<input
					type="password"
					id="password"
					placeholder="enter password"
					onChange={handleChange}
					value={loginForm.password}
				/>
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
