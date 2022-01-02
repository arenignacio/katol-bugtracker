import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from './components/Navigation';
import HeaderBar from './components/HeaderBar';

const Container = styled.div`
	height: 100vh;
`;
/*	background: rgb(76, 76, 84);
	background: linear-gradient(
		90deg,
		rgba(76, 76, 84, 1) 0%,
		rgba(126, 126, 126, 1) 22%,
		rgba(255, 255, 255, 1) 100%
	);*/

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: ${({ navHidden }) => (navHidden ? 'column' : 'row')};
	box-sizing: border-box;
	height: 95%;
	width: 100%;
`;

const App = () => {
	const navHidden = false;

	return (
		<Container navHidden={navHidden}>
			<div style={{ height: '5%' }}>
				<HeaderBar></HeaderBar>
			</div>
			<BodyWrapper>
				{navHidden ? '' : <Navigation widthSize="10%"></Navigation>}
				<div
					style={{
						boxSizing: 'border-box',
						width: navHidden ? '100%' : '87%',
						padding: '30px',
						background: '#fff',
						height: '100%',
					}}
				>
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
			</BodyWrapper>
		</Container>
	);
};

export default App;
