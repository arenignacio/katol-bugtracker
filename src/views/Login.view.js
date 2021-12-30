import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_BASEURL } from '../utils/constants';

const Login = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		fetch(`${API_BASEURL}/user/amIloggedIn`)
			.then(async (response) => response.json())
			.then((isLoggedIn) => {
				if (isLoggedIn) setIsLoggedIn(isLoggedIn);
			});
	}, []);

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
				navigate('/user');
			} else navigate('/');
		});
	};

	return (
		<>
			{!isLoggedIn ? (
				<form onSubmit={onSubmitLogin}>
					<div>
						<label htmlFor="email">E-mail: </label>
						<input
							type="text"
							id="email"
							placeholder="enter email"
							onChange={handleChange}
							value={loginForm.email}
						/>
					</div>
					<div>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							id="password"
							placeholder="enter password"
							onChange={handleChange}
							value={loginForm.password}
						/>
					</div>
					<input type="submit" value="Submit" />
				</form>
			) : (
				navigate('/user')
			)}
		</>
	);
};

export default Login;
