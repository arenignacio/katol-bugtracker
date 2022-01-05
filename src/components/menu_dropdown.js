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
		text-align: left;
		position: absolute;
		top: 100%;
		right: 0;
		margin: 1px;
		padding: 5px;
		font-family: arial;
		font-size: 12px;

		background-color: #f9f9f9;
		z-index: 1;

		span {
			white-space: nowrap;
			margin-bottom: 2.5px;
		}
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.5);

	&:hover {
		color: rgba(0, 0, 0, 1);
	}
`;

const MenuDropdown = ({ linksArr }) => {
	const renderLinks = (links) => {
		return links.map((link, idx) => {
			return (
				<span key={`menu-link-${idx}`}>
					<StyledLink to={link.to}>{link.name}</StyledLink>
				</span>
			);
		});
	};

	return (
		<Wrapper>
			{' '}
			<div className="dropdown">
				<div className="dropbtn">
					<MyProfile id="profile-svg" width={30} height={30}></MyProfile>
				</div>
				<div className="dropdown-content">{renderLinks(linksArr)}</div>
			</div>
		</Wrapper>
	);
};

export default MenuDropdown;
