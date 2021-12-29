import { useState } from 'react';

const Login = () => {
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
		console.log(loginForm);
	};

	return (
		<>
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
						type="text"
						id="password"
						placeholder="enter password"
						onChange={handleChange}
						value={loginForm.password}
					/>
				</div>
				<input type="submit" value="Submit" />
			</form>
		</>
	);
};

export default Login;
