//#dependencies
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//#components
import Login from './views/Login-Register.view';
import Dashboard from './views/Dashboard';
import Projects from './views/Projects';
import Tickets from './views/Tickets';
import MyProfile from './views/MyProfile';
import Settings from './views/Settings';
import Navigation from './components/Navigation';
import HeaderBar from './components/HeaderBar';

/* import checkLoginStatus from './utils/UseVerifyLogin'; */
//#utilities
import { API_BASEURL } from './utils/constants';

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
		{
			to: '/myprofile',
			name: 'My Profile',
			handler: () => setActivePage('MyProfile'),
		},
		{
			to: '/',
			name: 'Logout',
			handler: handleLogout,
		},
	];

	const [currentUser, setCurrentUser] = useState(null);
	const [activePage, setActivePage] = useState('Dashboard');
	const [isLoggedIn, setIsLoggedIn] = useState(
		JSON.parse(localStorage.getItem('isLoggedIn'))
	);

	//! used to simulate login status for front-end development
	const fauxLogin = true;

	useEffect(() => {
		console.log('first useEffect running..');

		localStorage.removeItem('isLoggedIn');

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
				setCurrentUser(null);
			}

			setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')));
			console.log('first useEffect done');
		};

		checkLoginStatus();
	}, []);

	useEffect(() => {
		console.log('isLoggedIn is: ' + isLoggedIn);
	}, [isLoggedIn]);

	async function handleLogout() {
		console.log('logout executed');
		await fetch(`${API_BASEURL}/user/logout`);
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(null);
		setCurrentUser(null);
	}

	const renderActivePage = (activePage) => {
		console.log('active page is ' + activePage);
		let page = '';

		if (activePage === 'Dashboard') page = <Dashboard></Dashboard>;
		if (activePage === 'Settings') page = <Settings></Settings>;
		if (activePage === 'MyProfile') page = <MyProfile></MyProfile>;
		if (activePage === 'Project') page = <Projects></Projects>;
		if (activePage === 'Tickets') page = <Tickets></Tickets>;

		return page;
	};

	return (
		<>
			{!isLoggedIn ? (
				<Login
					handleLogin={(val) => {
						if (val) setIsLoggedIn(true);
						setCurrentUser(val);
					}}
				/>
			) : (
				<Container navHidden={navHidden}>
					<div style={{ height: '5%', zIndex: '2' }}>
						<HeaderBar
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
