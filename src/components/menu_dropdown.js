import styled from 'styled-components';
import { Link } from 'react-router-dom';

//#components
import { ReactComponent as MyProfile } from '../assets/img/my_profile.svg';

const Wrapper = styled.div`
	z-index: 3;
	position: relative;

	/* The dropdown container */
	.dropdown {
		display: flex;
		flex-direction: column;
		position: relative;

		&:hover .dropdown-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.dropbtn {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;

			&:hover {
				cursor: pointer;

				#profile-svg {
					fill: hsla(80, 80%, 50%, 1);
				}
			}
		}
	}

	.dropdown-content {
		display: none;
		position: absolute;
		top: 100%;
		margin: 1px;
		padding: 5px;
		right: 0;
		background-color: #f9f9f9;
		z-index: 1;

		span {
			display: block;
		}
	}
`;

const MenuDropdown = () => {
	return (
		<Wrapper>
			{' '}
			<div class="dropdown">
				<div class="dropbtn">
					<MyProfile id="profile-svg" width={30} height={30}></MyProfile>
				</div>
				<div class="dropdown-content">
					<span>
						<Link to="/myprofile">My Profile</Link>
					</span>
					<span>
						<Link to="/">Logout</Link>
					</span>
				</div>
			</div>
		</Wrapper>
	);
};

export default MenuDropdown;
