import { useEffect, useState } from 'react';

import styled from 'styled-components';
import loginBg from '../assets/img/bubbles.jpg';

import LoginForm from '../components/Login.form';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: #ffffff url(${loginBg}) center/cover no-repeat;
`;

const Login = ({ handleLogin }) => {
	return (
		<Wrapper>
			<LoginForm></LoginForm>
		</Wrapper>
	);
};

export default Login;
