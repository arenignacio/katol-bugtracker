import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from './components/Navigation';

import './reset.css';

const Container = styled.div`
	display: flex;
	flex-direction: ${({ navHidden }) => (navHidden ? 'column' : 'row')}
	border: solid black;
	background: rgb(76, 76, 84);
	background: linear-gradient(
		90deg,
		rgba(76, 76, 84, 1) 0%,
		rgba(126, 126, 126, 1) 22%,
		rgba(255, 255, 255, 1) 100%
	);
	width: 100%;
`;

const App = () => {
	const navHidden = false;

	return (
		<Container navHidden={navHidden}>
			{navHidden ? '' : <Navigation></Navigation>}
			<div style={{ width: navHidden ? '100%' : '80%', background: '#fff' }}>
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
		</Container>
	);
};

export default App;
