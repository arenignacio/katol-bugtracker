import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import verifyStatus from './utils/UseVerifyLogin';

const App = () => {
	/* 	useEffect(() => {
		verifyStatus();
	}); */

	return (
		<div style={{ display: 'flex' }}>
			<Navigation></Navigation>
			<div style={{ width: '80%' }}>
				<h1>This is App. test</h1>
				<div>
					{' '}
					<Link style={{ marginRight: '10px' }} to="/Login">
						login
					</Link>
					<Link style={{ marginRight: '10px' }} to="/User">
						user
					</Link>
				</div>

				<h3>App renders here</h3>
				<Outlet />
			</div>
		</div>
	);
};

export default App;
