import { useEffect, useState } from 'react';

import styled from 'styled-components';
import loginBg from '../assets/img/bubbles.jpg';
import { ReactComponent as Logo } from '../assets/img/spiral.svg';

import LoginForm from '../components/Login.form';

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
			flex-direction: ${({ activeForm }) => {
				return activeForm === 'login' ? 'column' : 'row';
			}};
			align-items: center;
			border-bottom: 1.5px solid rgba(0, 0, 0, 0.5);
			padding-bottom: 25px;
			margin-bottom: 25px;
			font-size: ${({ activeForm }) =>
				activeForm === 'login' ? '50px' : '25px'};
			font-family: 'Montserrat', sans-serif;
			letter-spacing: 5px;
			${({ activeForm }) => {
				return activeForm === 'login' ? '' : 'height: 50px;';
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
	const [activeForm, setActiveForm] = useState('login');

	const handleFormChange = () => {
		activeForm === 'login'
			? setActiveForm('register')
			: setActiveForm('login');
	};

	return (
		<Wrapper activeForm={activeForm}>
			<div id="content">
				<div className="logo-container">
					<div id="logo">
						<Logo width={activeForm === 'login' ? 160 : 50} />
					</div>
					<span>KATOL</span>
				</div>
				{activeForm === 'login' ? (
					<LoginForm
						handleLogin={handleLogin}
						handleFormChange={handleFormChange}
					></LoginForm>
				) : (
					<div>
						This is registration
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
						<div>12312</div>
					</div>
				)}
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
