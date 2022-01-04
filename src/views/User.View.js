import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASEURL } from '../utils/constants';

const User = () => {
	let [user, setUser] = useState(null);
	//const navigate = useNavigate();

	const handleLogout = () => {
		console.log('handle logout clicked');
		fetch(`${API_BASEURL}/user/logout`);
		localStorage.removeItem('isLoggedIn');
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
			<button onClick={handleLogout}>
				<Link to="/">Logout</Link>
			</button>
		</>
	);
};

export default User;
