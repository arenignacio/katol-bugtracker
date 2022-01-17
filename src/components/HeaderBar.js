import styled from 'styled-components';

//components
import Menu from './menu_dropdown';

//assets
import { ReactComponent as Logo } from '../assets/img/spiral.svg';

const Wrapper = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;

	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
	width: 100%;
	background: #fff;
	height: 5%;
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

const headerBar = ({ headerLinksArr, currentUser, fixed = false }) => {
	return (
		<Wrapper fixed={fixed}>
			<LogoWrapper>
				<div id="logo">
					<Logo width={30} height={30} />
				</div>
				<span>KATOL</span>
			</LogoWrapper>
			<div id="menu">
				<span>
					<Menu linksArr={headerLinksArr} currentUser={currentUser}></Menu>
				</span>
				<span>Help</span>
			</div>
		</Wrapper>
	);
};

export default headerBar;
