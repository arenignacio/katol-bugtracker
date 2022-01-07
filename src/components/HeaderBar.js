import styled from 'styled-components';

//components
import Menu from './menu_dropdown';

//assets
import { ReactComponent as Logo } from '../assets/img/spiral.svg';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
	width: 100%;
	background: #fff;
	height: 100%;
	z-index: 2;

	#menu {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span {
		margin-right: 15px;
	}
`;

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-left: 15px;
	font-family: 'Montserrat', sans-serif;

	#logo {
		transform: rotate(-45deg);
	}

	span {
		margin-left: 0.5rem;
	}
`;

const headerBar = ({ handleLogout, headerLinksArr, currentUser }) => {
	return (
		<Wrapper>
			<LogoWrapper>
				<div id="logo">
					<Logo width={30} height={30} />
				</div>
				<span>KATOL</span>
			</LogoWrapper>
			<div id="menu">
				<span>
					<Menu
						handleMenuLogout={handleLogout}
						linksArr={headerLinksArr}
						currentUser={currentUser}
					></Menu>
				</span>
				<span>Help</span>
			</div>
		</Wrapper>
	);
};

export default headerBar;
