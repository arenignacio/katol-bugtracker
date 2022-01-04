import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASEURL } from '../utils/constants';

const User = () => {
	let [user, setUser] = useState(null);
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log('handle logout clicked');
		fetch(`${API_BASEURL}/user/logout`);
		navigate('/login');
	};

	useEffect(() => {
		const renderUsers = async () => {
			const url = `${API_BASEURL}/user/query`;
			console.log(url);
			const data = await fetch(url);
			const users = await data.json();

			setUser(users[0]);
		};

		renderUsers();
	}, []);

	return (
		<>
			{user ? <div>Welcome {user.firstname} </div> : <div>Loading..</div>}
			<div>List of Users</div>
			<button onClick={handleLogout}>Logout</button>
		</>
	);
};

export default User;
