const Login = () => {
	return (
		<>
			<form>
				<div>
					<label htmlFor="email">E-mail: </label>
					<input type="text" id="email" placeholder="enter email" />
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input type="text" id="password" placeholder="enter password" />
				</div>
			</form>
		</>
	);
};

export default Login;
