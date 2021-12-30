import { useEffect, useState } from 'react';
import { API_BASEURL } from '../utils/constants';

const User = () => {
	let [user, setUser] = useState(null);

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
		</>
	);
};

export default User;
