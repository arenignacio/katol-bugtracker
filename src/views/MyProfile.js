import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	height: 1000px;
	background: blue;
	margin: 5px;
	z-index: 1;
`;

const MyProfile = ({ user }) => {
	console.log(user);

	return <Wrapper>My profile</Wrapper>;
};

export default MyProfile;
