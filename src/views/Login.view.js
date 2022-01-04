import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_BASEURL } from '../utils/constants';

import styled from 'styled-components';
import loginBg from '../assets/img/bubbles.jpg';
import { ReactComponent as Logo } from '../assets/img/spiral.svg';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: #ffffff url(${loginBg}) center/cover no-repeat;

	#logo-rect {
		width: 25px;
	}

	#content {
		display: flex;
		flex-direction: column;
		background: white;
		padding: 20px 30px;
		border: 1px solid grey;
		border-radius: 7px;
		margin-bottom: 5px;

		#register-prompt {
			display: flex;
			justify-content: center;
			margin-top: 0.8rem;
			font-size: 0.7rem;

			> span:nth-child(2) {
				font-weight: bold;
				color: blue;
				text-decoration: underline;

				&:hover {
					cursor: pointer;
				}
			}
		}

		.logo-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			border-bottom: 1.5px solid rgba(0, 0, 0, 0.5);
			padding-bottom: 25px;
			margin-bottom: 25px;
			font-size: 50px;
			font-family: 'Montserrat', sans-serif;
			letter-spacing: 5px;

			#logo {
				transform: rotate(-45deg);
			}
		}

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
	}

	#attribution {
		font-size: 10px;
	}
`;

const Login = ({ handleLogin }) => {
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		fetch(`${API_BASEURL}/user/amIloggedIn`)
			.then(async (response) => response.json())
			.then((isLoggedIn) => {
				if (isLoggedIn) handleLogin(isLoggedIn);
			});
	}, [handleLogin]);

	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setLoginForm((prevState) => {
			return e.target.id === 'email'
				? { ...prevState, email: e.target.value }
				: { ...prevState, password: e.target.value };
		}); /* 
		else setLoginForm({ password: e.target.value }); */
	};

	const onSubmitLogin = (e) => {
		e.preventDefault();

		console.log(JSON.stringify(loginForm));

		fetch(`${API_BASEURL}/user/login`, {
			method: 'Post',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(loginForm),
		}).then((response) => {
			console.log(response.ok);
			if (response.ok) {
				handleLogin(response.ok);
			} else {
				setErrorMsg('Invalid email/password');
			}
		});
	};

	const onClickRegister = (e) => {
		e.preventDefault();
		navigate('/Register');
	};

	return (
		<Wrapper>
			<div id="content">
				<div className="logo-container">
					<div id="logo">
						<Logo width={160} />
					</div>
					<span>KATOL</span>
				</div>
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
			</div>
			<div id="attribution">
				Background Photo by{' '}
				<a href="https://unsplash.com/@tayo_ux?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					John Olopade
				</a>{' '}
				on{' '}
				<a href="https://unsplash.com/t/textures-patterns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Unsplash
				</a>
			</div>
		</Wrapper>
	);
};

export default Login;
