import { Link, Outlet } from 'react-router-dom';

const App = () => {
	return (
		<div>
			<h1>This is App. test</h1>
			<div>
				{' '}
				<Link style={{ marginRight: '10px' }} to="/Login">
					login
				</Link>
				<Link style={{ marginRight: '10px' }} to="/User">
					user
				</Link>
				<Outlet />
			</div>
		</div>
	);
};

export default App;
