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
		}

		.dropbtn {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
		}

		&:hover {
			cursor: pointer;

			#username {
				color: hsla(200, 100%, 35%, 1);
			}

			#profile-svg {
				fill: hsla(200, 100%, 35%, 1);
			}
		}
	}

	.dropdown-content {
		display: none;
		text-align: left;
		position: absolute;
		padding-top: 0.2rem;
		width: 100%;
		top: 100%;
		z-index: 1;
	}
`;

const StyledLink = styled(Link)`
	display: flex;
	white-space: nowrap;
	width: 100%;
	padding: 10px;
	outline: 1px rgba(0, 0, 0, 0.5) solid;
	text-decoration: none;
	font-family: arial;
	font-size: 13px;
	font-weight: bold;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.7);

	&:hover {
		background: hsla(200, 30%, 50%, 1);
		color: white;
	}
`;

const MenuDropdown = ({ handleMenuLogout, linksArr }) => {
	const renderLinks = (links) => {
		return links.map((link, idx) => {
			return (
				<StyledLink
					onClick={() => {
						if (link.name === 'Logout') handleMenuLogout();
					}}
					key={`menu-link-${idx}`}
					to={link.to}
				>
					{link.name}
				</StyledLink>
			);
		});
	};

	return (
		<Wrapper>
			{' '}
			<div className="dropdown">
				<div className="dropbtn">
					<span id="username">johdoe123</span>
					<MyProfile id="profile-svg" width={30} height={30}></MyProfile>
				</div>

				<div className="dropdown-content">{renderLinks(linksArr)}</div>
			</div>
		</Wrapper>
	);
};

export default MenuDropdown;
