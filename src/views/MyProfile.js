import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	height: 1000px;
	background: background: rgba(0, 0, 0, 0.1);
	z-index: 1;

	#layer1 {
		display: flex;
	}

	#layer2 {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		height: 80%;

		#account-details { 
			width: 40%;
			height: 75%;
			box-sizing: border-box;
			border-radius: 5px;
			background: white;
			box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
			overflow: hidden;

			#header {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 20%;
				background: gray;

				#profile-pic {
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					bottom: -50%;
					min-height: 120px;
					min-width: 120px;
					border-radius: 50%;
					box-sizing: border-shadow;
					border: 5px solid white;
					padding: 10px;
					font-size: 5rem;
					background: gray;
				}
			}
		}

		#
	}
`;

const MyProfile = ({ user }) => {
	console.log(user);

	return (
		<Wrapper>
			<div id="layer1">My profile</div>
			<div id="layer2">
				<div id="account-details">
					<div id="header">
						<div id="profile-pic">AI</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default MyProfile;
