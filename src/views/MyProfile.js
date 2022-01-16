import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border-radius: 5px;
	background: #fff;

	.flex {
		display: flex;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	#profile-pic {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25%;
		font-family: roboto, sans-serif;

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 8px solid white;
			border-radius: 50%;
			padding: 10px;
			height: 9rem;
			width: 10rem;
			font-size: 5rem;
			color: white;
			background: hsla(360, 50%, 50%, 1);
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

	#header {
		display: flex;
		align-items: center;
		height: 25%;
		background: hsla(240, 30%, 80%, 1);
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;

		div {
			position: relative;
			bottom: -50%;
			left: 2%;
		}
	}

	#title {
		display: flex;
		justify-content: center;
		width: 100%;
		font-size: 52px;
		font-family: serif;
	}

	#info {
		display: flex;
		justify-content: space-evenly;

		&-col1,
		&-col2 {
			display: flex;
			width: 50%;
			padding: 50px;
			background: gray;
		}
	}
`;

const MyProfile = ({ user }) => {
	return (
		<Wrapper>
			<div id="header">
				<div id="profile-pic">
					<div>JD</div>
				</div>
			</div>
			<div id="body">
				<div id="title">My Profile</div>
				<div id="info">
					<div id="info-col1">col1</div>
					<div id="info-col2">col2</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default MyProfile;
