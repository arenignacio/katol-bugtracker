import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	height: 100%;

	#content {
		width: 80%;
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

		.detail {
			display: flex;
			flex-direction: column;
			margin-bottom: 50px;
		}

		#profile-pic {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 25%;
			min-width: 200px;
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
			flex-direction: column;
			margin-left: clamp(225px, 26%, 27%);
			width: 100%;
			height: 55px;
			font-size: 46px;
			font-family: serif;
			color: rgba(0, 0, 0, 0.6);

			span {
				font-size: 1.2rem;
			}
		}

		#info {
			display: flex;
			justify-content: space-evenly;
			margin-top: 85px;
			width: 100%;

			&-col1,
			&-col2 {
				display: flex;
				flex-direction: column;
				font-family: arial;

				label {
					font-size: 1.5rem;
					font-weight: bold;
					margin-bottom: 7px;
				}

				span {
					font-size: 1.1rem;
					color: rgba(0, 0, 0, 0.6);
				}
			}

			&-col1 {
				margin-right: -50px;
			}

			&-col2 {
				margin-left: -50px;
			}
		}
	}
`;

const MyProfile = ({ user }) => {
	return (
		<Wrapper>
			<div id="content">
				<div id="header">
					<div id="profile-pic">
						<div>JD</div>
					</div>
				</div>
				<div id="body">
					<div id="title">
						<div>Software Engineer</div>
						<span>johdoe123</span>
					</div>
					<div id="info">
						<div id="info-col1">
							<div id="firstname" class="detail">
								<label htmlFor="firstname">First Name</label>
								<span>John</span>
							</div>
							<div id="email" class="detail">
								<label htmlFor="email">E-mail</label>
								<span>johdoe123@email.com</span>
							</div>
						</div>
						<div id="info-col2">
							{' '}
							<div id="lastname" class="detail">
								<label htmlFor="lastname">Last Name</label>
								<span>Doe</span>
							</div>
							<div id="phone" class="detail">
								<label htmlFor="phone">Phone</label>
								<span>123-456-7890</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default MyProfile;
