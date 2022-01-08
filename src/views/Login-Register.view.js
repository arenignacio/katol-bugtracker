import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { API_BASEURL } from '../utils/constants';

import loginBg from '../assets/img/bubbles.jpg';
import { ReactComponent as Logo } from '../assets/img/spiral.svg';

import Form from '../components/Form';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: #ffffff url(${loginBg}) center/cover no-repeat;

	#content {
		display: flex;
		flex-direction: column;
		background: white;
		padding: 20px 30px;
		border: 1px solid grey;
		border-radius: 7px;
		margin-bottom: 5px;

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

		#prompt {
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
			flex-direction: ${({ isLoginForm }) => {
				return isLoginForm ? 'column' : 'row';
			}};
			align-items: center;
			border-bottom: 1.5px solid rgba(0, 0, 0, 0.5);
			padding-bottom: 25px;
			margin-bottom: 25px;
			font-size: ${({ isLoginForm }) => (isLoginForm ? '50px' : '25px')};
			font-family: 'Montserrat', sans-serif;
			letter-spacing: 5px;
			${({ isLoginForm }) => {
				return isLoginForm ? '' : 'height: 50px;';
			}}

			#logo {
				transform: rotate(-45deg);
			}
		}
	}

	#attribution {
		font-size: 10px;
	}
`;

const Login = ({ handleLogin }) => {
	//#states
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [errorMsg, setErrorMsg] = useState(null);

	const login = (data) => {
		localStorage.setItem('isLoggedIn', true);
		handleLogin(data);
	};

	const loginOptions = {
		fetchData: {
			url: `${API_BASEURL}/user/login`,
			options: {
				method: 'Post',
				headers: { 'Content-type': 'application/json; charset=UTF-8' },
				body: '',
			},
		},
		fields: [
			{
				email: '',
				password: '',
			},
			['Enter your email', 'Enter your password'],
		],
		buttons: [
			{
				name: 'Login',
				handler: login,
			},
		],
	};

	const registerOptions = {
		fetchData: {
			url: `${API_BASEURL}/user/register`,
			options: {
				method: 'Post',
				headers: { 'Content-type': 'application/json; charset=UTF-8' },
				body: '',
			},
		},
		fields: [
			{
				email: '',
				firstname: '',
				lastname: '',
				password: '',
				phone: '',
			},
			[
				'Enter email',
				'Enter first name',
				'Enter last name',
				'Enter password',
				'Enter phone number',
			],
		],
		buttons: [{ name: 'Register', handler: login }],
	};

	const toggleForm = () => {
		setIsLoginForm(!isLoginForm);
		setErrorMsg(null);
	};

	return (
		<Wrapper isLoginForm={isLoginForm}>
			<div id="content">
				<div className="logo-container">
					<div id="logo">
						<Logo width={isLoginForm ? 160 : 50} />
					</div>
					<span>KATOL</span>
				</div>
				{errorMsg ? <div id="errorMsg">{errorMsg}</div> : ''}
				{isLoginForm ? (
					<Form
						options={loginOptions}
						handleErrorMsg={(err) => setErrorMsg(err)}
					/>
				) : (
					<Form
						options={registerOptions}
						handleErrorMsg={(err) => setErrorMsg(err)}
					/>
				)}
				<div id="prompt">
					{isLoginForm ? (
						<>
							<span>Don't have an account yet?</span>&nbsp;
							<span onClick={toggleForm}>Register</span>
						</>
					) : (
						<>
							<span>Already have an account?</span>&nbsp;
							<span onClick={toggleForm}>Sign In</span>.
						</>
					)}
				</div>
			</div>

			<div id="attribution">
				Background Photo by &nbsp;
				<a href="https://unsplash.com/@tayo_ux?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					John Olopade
				</a>
				&nbsp; on &nbsp;
				<a href="https://unsplash.com/t/textures-patterns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
					Unsplash
				</a>
			</div>
		</Wrapper>
	);
};

export default Login;
