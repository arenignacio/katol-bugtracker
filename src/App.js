//#dependencies
import { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';

//#components
import Login from './views/Login-Register.view';
import Navigation from './components/Navigation';
import HeaderBar from './components/HeaderBar';

/* import checkLoginStatus from './utils/UseVerifyLogin'; */
//#utilities
import { API_BASEURL } from './utils/constants';
import { Outlet } from 'react-router-dom';

//#context
export const UserContext = createContext();

const Container = styled.div`
	color: rgba(0, 0, 0, 0.8);
	height: 100vh;
`;

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: ${({ navHidden }) => (navHidden ? 'column' : 'row')};
	box-sizing: border-box;
	min-height: 100%;
	width: 100%;

	#body-content {
		boxsizing: border-box;
		width: ${({ navHidden }) => (navHidden ? '100%' : '85%')};
		min-height: 100%;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.1);
		padding: 20px 35px;
		margin-left: 15%;
		z-index: 1;
	}
`;

const App = () => {
	const navHidden = false;

	const dropdownLinks = [
		{
			to: '/profile',
			name: 'My Profile',
		},
		{
			to: '/',
			name: 'Logout',
			handler: handleLogout,
		},
	];

	const navLinks = ['dashboard', 'projects', 'settings'];

	const [currentUser, setCurrentUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(
		JSON.parse(localStorage.getItem('isLoggedIn'))
	);

	useEffect(() => {
		console.log('checkloginstatus is running...');
		localStorage.removeItem('isLoggedIn');

		const checkLoginStatus = async () => {
			const response = await fetch(`${API_BASEURL}/user/myinfo`);
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('isLoggedIn', response.ok);

				setCurrentUser(data);
				console.log('data succesfully retrieved');
			} else {
				setCurrentUser(null);
			}

			setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')));
		};

		checkLoginStatus();
	}, []);

	async function handleLogout(e) {
		await fetch(`${API_BASEURL}/user/logout`);
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(null);
		setCurrentUser(null);
	}

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
				<UserContext.Provider
					value={[currentUser, setCurrentUser, setIsLoggedIn]}
				>
					<Container navHidden={navHidden}>
						<div
							style={{ position: 'relative', height: '5%', zIndex: '2' }}
						>
							<HeaderBar
								headerLinksArr={dropdownLinks}
								currentUser={
									currentUser
										? currentUser
										: { firstname: '', lastname: '' }
								}
								fixed={true}
							></HeaderBar>
						</div>
						<BodyWrapper>
							{navHidden ? (
								''
							) : (
								<Navigation
									navLinks={navLinks}
									widthSize="10%"
								></Navigation>
							)}

							<div id="body-content">
								<Outlet></Outlet>

								{/* renderActivePage(activePage) */}
							</div>
						</BodyWrapper>
					</Container>
				</UserContext.Provider>
			)}
		</>
	);
};

export default App;
