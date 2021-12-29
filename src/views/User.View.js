import { useEffect, useState } from 'react';

const User = () => {
	let [user, setUser] = useState(null);

	useEffect(() => {
		const renderUsers = async () => {
			const data = await fetch('http://localhost:8080/user/query');
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
