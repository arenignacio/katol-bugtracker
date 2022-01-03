import styled from 'styled-components';

//assets
import { ReactComponent as Logo } from '../assets/img/spiral.svg';
import { ReactComponent as MyProfile } from '../assets/img/my_profile.svg';

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

const headerBar = () => {
	return (
		<Wrapper>
			<LogoWrapper>
				<div id="logo">
					<Logo width={30} height={30} />
				</div>
				<span>Katol</span>
			</LogoWrapper>
			<div id="menu">
				<span>My Account</span>
				<span>
					<MyProfile width={25} height={25} />
				</span>
				<span>Help</span>
			</div>
		</Wrapper>
	);
};

export default headerBar;
