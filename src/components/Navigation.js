import styled from 'styled-components';

const Wrapper = styled.div`
	background: white;
	height: 100%;
	width: ${({ widthSize }) => {
		return widthSize ? widthSize : '15%';
	}};
	min-width: 200px;
	border-right: 1px solid black;
	padding: 30px;
`;

const Navigation = ({ widthSize }) => {
	return <Wrapper widthSize={widthSize}>This is Navigation</Wrapper>;
};

export default Navigation;
