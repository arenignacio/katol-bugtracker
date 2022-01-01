import styled from 'styled-components';

//assets
import { ReactComponent as Logo } from '../assets/img/spiral.svg';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
	width: 100%;
	background: #fff;
	height: 100%;
	}}vh;

	span {
		margin-right: 15px;
	}
`;

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-left: 15px;
	font-family: 'Montserrat', sans-serif;

	span {
		margin-left: 0.5rem;
	}
`;

const headerBar = () => {
	return (
		<Wrapper>
			<LogoWrapper>
				<Logo width={30} height={30} />
				<span>Katol</span>
			</LogoWrapper>
			<div>
				<span>My Account</span>
				<span>Picture</span>
				<span>Help</span>
			</div>
		</Wrapper>
	);
};

export default headerBar;
