//TODO: FIX SIDEBAR or REMOVE IT

//#dependencies
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	.header-container {
		height: 5vh;
		z-index: 2;
	}

	.navigation-container {
		z-index: 1;
	}
`;

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: ${({ navHidden }) => (navHidden ? 'column' : 'row')};
	box-sizing: border-box;
	height: 95vh;
	width: 100%;

	#body-content {
		boxsizing: border-box;
		width: 90vw;
		min-height: 100%;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.1);
		margin-left: 10vw;
		z-index: 1;
	}
`;

const App = () => {
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(
		JSON.parse(localStorage.getItem('isLoggedIn'))
	);
	const [activeBtn, setActiveBtn] = useState('dashboard');

	const navLinks = ['dashboard', 'projects', 'tickets', 'settings'];
	const dropdownLinks = [
		{
			name: 'My Profile',
			handler: () => {
				console.log('active button set');
				setActiveBtn(null);
				navigate('profile');
			},
		},
		{
			to: '/',
			name: 'Logout',
			handler: handleLogout,
		},
	];

	//verify login status
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
						navigate('dashboard');
					}}
				/>
			) : (
				<UserContext.Provider
					value={[currentUser, setCurrentUser, setIsLoggedIn]}
				>
					<Container>
						<div className="header-container">
							<HeaderBar
								headerLinksArr={dropdownLinks}
								currentUser={currentUser}
								fixed={true}
							></HeaderBar>
						</div>
						<BodyWrapper>
							<div className="navigation-container">
								<Navigation
									navLinks={navLinks}
									activeBtn={activeBtn}
									setActiveBtn={setActiveBtn}
								></Navigation>
							</div>

							<div id="body-content">
								<Outlet></Outlet>
							</div>
						</BodyWrapper>
					</Container>
				</UserContext.Provider>
			)}
		</>
	);
};

export default App;
