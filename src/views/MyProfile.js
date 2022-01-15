import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 30px;
	box-sizing: border-box;
	border-radius: 5px;
	background: #fff;

	.row {
		display: flex;
	}

	#profile-pic {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25%;
		font-family: roboto, sans-serif;

		div {
			border: 1px solid black;
			border-radius: 50%;
			padding: 25px;
			font-size: 5rem;
		}
	}

	#profile-name {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 75%;
		padding: 1rem;
	}

	#profile-fullname {
		font-size: 3rem;
	}

	#profile-username {
		font-size: 0.8rem;
		margin-bottom: 3px;
	}

	#profile-number {
		font-size: 0.8rem;
	}
`;

const MyProfile = ({ user }) => {
	return (
		<Wrapper>
			<div className="row">
				<div id="profile-pic">
					<div>JD</div>
				</div>
				<div id="profile-name">
					<div id="profile-fullname">John Doe</div>
					<div id="profile-username">johdoe123@email.com</div>
					<div id="profile-number">123-45-6789</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default MyProfile;
