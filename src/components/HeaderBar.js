import styled from 'styled-components';

//assets
import { ReactComponent as Logo } from '../assets/img/spiral.svg';

const Wrapper = styled.div`
	display: flex;
   align-items: center;
   border-bottom: 0.5px solid rgba(0,0,0, 0.5);
	width: 100%;
   background: #fff;
	height: ${({ heightSize }) => {
		return heightSize ? heightSize : '5';
	}}vh;

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

const headerBar = ({ heightSize }) => {
	return (
		<Wrapper heightSize={heightSize}>
			<LogoWrapper>
				<Logo width={30} height={30} />
				<span>Katol</span>
			</LogoWrapper>
		</Wrapper>
	);
};

export default headerBar;
