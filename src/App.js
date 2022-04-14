//TODO: FIX SIDEBAR or REMOVE IT

//#dependencies
import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//#components
import Login from './views/Login-Register.view';
import Navigation from './components/Navigation';
import HeaderBar from './components/HeaderBar';
import { ReactComponent as New } from '../src/assets/img/new.svg';

/* import checkLoginStatus from './utils/UseVerifyLogin'; */
//#utilities
import { API_BASEURL } from './utils/constants';
import { Outlet } from 'react-router-dom';
import requests from './utils/requests';

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

		> div > ul > li > span {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&.active .icon {
				display: block;
			}
		}

		span {
			display: flex;
			align-items: center;
		}

		.icon {
			display: none;
			transition: opacity 0.4s ease-in-out;
			fill: rgba(0, 0, 0, 0.3);
			font-weight: bold;

			&:hover {
				cursor: pointer;
				fill: rgba(0, 0, 0, 0.8);
			}
		}
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

	.sub-list {
		margin-left: 5px;
		width: 7vw;
	
	}

	.subnav {
		margin-top: 7px;
		height: 1rem;
		font-family: montserrat;
		font-size: 0.7rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-top: 2px;

		&:hover {
			font-weight: 500;
			color: rgba(0, 0, 0, 0.9);
			cursor: pointer;
		}

		&:active {
			color: rgba(0, 0, 0, 0.5);
		}
	}
	}
}
`;

const App = () => {
	const defaultLoc = 'dashboard';

	const navigate = useNavigate();
	const API = requests(API_BASEURL);

	const [currentUser, setCurrentUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(
		JSON.parse(localStorage.getItem('isLoggedIn'))
	);
	const [activeBtn, setActiveBtn] = useState(defaultLoc);
	const [activeSubBtn, setActiveSubBtn] = useState(null);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [allProjects, setAllProjects] = useState(null);
	const [currentProject, setCurrentProject] = useState(
		'61ed05ec878f129f1a51e196'
	);
	const navLinks = [
		'dashboard',
		<li key={'project-idx'}>
			<span
				id="projects"
				className={activeBtn === 'projects' ? 'active' : ''}
				onClick={(e) => {
					setActiveBtn('projects');
					setActiveSubBtn(null);
					const classes = [...e.target.classList];
					if (!classes.includes('new-btn')) navigate(`/projects`);
					else {
						navigate('/projects/new-project');
					}
				}}
			>
				{'Projects'}
				<span className="new-btn">
					<New className="icon new-btn" height="15px" />
				</span>
			</span>
			<div className="sub-list">
				{allProjects ? renderProjectsNav(allProjects) : ''}
			</div>
		</li>,
		'tickets',
		'settings',
	];

	const dropdownLinks = [
		{
			name: 'My Profile',
			handler: () => {
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

	useEffect(() => {
		if (!localStorage.getItem('isLoggedIn')) {
			navigate('/');
		}
	}, []);

	//verify login status
	useEffect(() => {
		localStorage.removeItem('isLoggedIn');

		const checkLoginStatus = async () => {
			const response = await fetch(`${API_BASEURL}/user/myinfo`);
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('isLoggedIn', response.ok);
				setCurrentUser(data);
			} else {
				setCurrentUser(null);
			}

			setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')));
		};

		checkLoginStatus();
	}, []);

	useEffect(() => {
		const getProjects = async () => {
			const data = await API.get('project');
			setAllProjects(data);
		};

		getProjects();
	}, []);

	async function handleLogout(e) {
		await fetch(`${API_BASEURL}/user/logout`);
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(null);
		setCurrentUser(null);
	}

	function renderProjectsNav(projects) {
		if (projects) {
			return projects.map((project) => {
				return (
					<div
						className={`subnav ${
							activeSubBtn === project._id ? 'active' : ''
						}`}
						onClick={(e) => {
							navigate(`/projects/${project._id}`);
							setActiveBtn('projects');
							setActiveSubBtn(project._id);
						}}
					>
						{project.name}
					</div>
				);
			});
		}
	}

	return (
		<>
			{!isLoggedIn ? (
				<Login
					handleLogin={(val) => {
						if (val) setIsLoggedIn(true);
						setCurrentUser(val);
						navigate('/' + defaultLoc);
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
									setActiveSubBtn={setActiveSubBtn}
								></Navigation>
							</div>

							<div id="body-content">
								<Outlet
									context={{
										selectedTicket,
										setSelectedTicket,
										setActiveBtn,
										currentProject,
										setCurrentProject,
									}}
								></Outlet>
							</div>
						</BodyWrapper>
					</Container>
				</UserContext.Provider>
			)}
		</>
	);
};

export default App;
