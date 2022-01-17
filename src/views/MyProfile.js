import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	height: 100%;
	background: background: rgba(0, 0, 0, 0.1);
	z-index: 1;

	#layer1 {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		font-size: 2rem;
	}

	#layer2 {
		display: flex;
		justify-content: space-evenly;
		width: 90%;

		#account-details { 
			width: 40%;
			min-width: 400px;
			min-height: 75%;
			box-sizing: border-box;
			border-radius: 5px;
			background: white;
			box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
			overflow: hidden;

			#header {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				width: 100%;
				height: 20%;
				background: rgba(0,0,0, 0.2);


				#profile-pic {
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					bottom: -50%;
					min-height: 120px;
					min-width: 120px;
					max-height: 120px;
					max-width: 120px;
					border-radius: 50%;
					box-sizing: border-shadow;
					border: 5px solid white;
					padding: 15px;
					font-size: 5rem;
					background: hsla(20, 50%, 50%, 1);
				}

				
			}

			#personal-info {
				display: flex;
				justify-content: space-evenly;
				flex-wrap: wrap;
				margin-top: 100px;


				div {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 2rem;
					flex: 50%;

					label {
						font-weight: bold;
					}

					span {
						color: rgba(0, 0, 0, 0.6);
					}
				}
			}

			#about-me-label {
				display: flex;
				justify-content: center;
				margin-top: 15px;
				font-weight: bold;
			}

			#about-me-content {
				padding: 5px 25px 15px 25px;
				text-align: left;
			}

			#btn-grp {
				display: flex;
				justify-content: center;
				height: 2.5rem;

				div {
					margin: 15px 0px;
					font-weight: bold;


					&:hover {
						cursor: pointer;
					}

					&:active {
						color: rgba(0,0,0, 0.5);
					}
				}
			}
		}

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
						<div id="profile-pic">JD</div>
					</div>

					<div id="personal-info">
						<div>
							<label htmlFor="First Name">First Name</label>
							<span>John</span>
						</div>
						<div>
							<label htmlFor="Last Name">Last Name</label>
							<span>Doe</span>
						</div>
						<div>
							<label htmlFor="E-mail">E-mail</label>
							<span>johdoe123@email.com</span>
						</div>
						<div>
							<label htmlFor="Phone">Phone</label>
							<span>123.456.7890</span>
						</div>
						<div>
							<label htmlFor="Password">Password</label>
							<span>******</span>
						</div>
						<div>
							<label htmlFor="Username">Username</label>
							<span>johdoe123</span>
						</div>
					</div>
					<div id="about-me-label">About me</div>
					<div id="about-me-content">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						Doloremque dignissimos nihil nisi consequuntur corporis
						adipisci, accusamus inventore esse quaerat? Consequuntur
						maxime dicta asperiores optio ut dolore libero at quis illum
					</div>
					<div id="btn-grp">
						<div>edit</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default MyProfile;
