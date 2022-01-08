//#dependencies
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//#components
import Navigation from './components/Navigation';
import HeaderBar from './components/HeaderBar';
import Login from './views/Login-Register.view';
import Dashboard from './views/Dashboard';

/* import checkLoginStatus from './utils/UseVerifyLogin'; */
//#utilities
import { API_BASEURL } from './utils/constants';
import parseFromStorage from './utils/parseFromLocalStorage';

const Container = styled.div`
	color: rgba(0, 0, 0, 0.8);
	height: 100vh;
`;

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: ${({ navHidden }) => (navHidden ? 'column' : 'row')};
	box-sizing: border-box;
	height: 95%;
	width: 100%;
`;

const App = () => {
	const navHidden = false;

	const linksArr = [
		{ to: '/myprofile', name: 'My Profile' },
		{ to: '/', name: 'Logout' },
	];

	const [currentUser, setCurrentUser] = useState(null);
	const [activePage, setActivePage] = useState('Dashboard');

	//! used to simulate login status for front-end development
	const fauxLogin = true;

	useEffect(() => {
		const checkLoginStatus = async () => {
			const response = await fetch(`${API_BASEURL}/user/myinfo`);
			console.log('getinfo response is ' + response.ok);
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('isLoggedIn', response.ok);
				console.log('data is ', data);
				console.log(
					'user is logged in: ' + localStorage.getItem('isLoggedIn')
				);
				setCurrentUser(data);
			} else {
				console.log('failed to get info');
				console.log('user is logged in: ' + false);
				localStorage.removeItem('isLoggedIn');
				setCurrentUser(null);
			}
		};

		checkLoginStatus();
	}, []);

	const handleLogout = async () => {
		console.log('logout executed');
		await fetch(`${API_BASEURL}/user/logout`);
		localStorage.removeItem('isLoggedIn');
		setCurrentUser(null);
	};

	const renderActivePage = (activePage) => {
		if (activePage === 'Dashboard') return <Dashboard></Dashboard>;
	};

	return (
		<>
			{!parseFromStorage('isLoggedIn') ? (
				<Login
					handleLogin={(val) => {
						setCurrentUser(val);
					}}
				/>
			) : (
				<Container navHidden={navHidden}>
					<div style={{ height: '5%', zIndex: '2' }}>
						<HeaderBar
							handleLogout={handleLogout}
							headerLinksArr={linksArr}
							currentUser={
								currentUser
									? currentUser
									: { firstname: '', lastname: '' }
							}
						></HeaderBar>
					</div>
					<BodyWrapper>
						{navHidden ? (
							''
						) : (
							<Navigation
								widthSize="10%"
								setActivePage={(page) => setActivePage(page)}
							></Navigation>
						)}
						<div
							style={{
								boxSizing: 'border-box',
								width: navHidden ? '100%' : '87%',
								padding: '30px',
								background: '#fff',
								height: '100%',
							}}
						>
							{renderActivePage(activePage)}
						</div>
					</BodyWrapper>
				</Container>
			)}
		</>
	);
};

export default App;
