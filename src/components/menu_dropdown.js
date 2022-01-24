import styled from 'styled-components';

//#components
import { ReactComponent as MyProfile } from '../assets/img/my_profile.svg';
import { MenuButton, MenuLink } from '.';

const Wrapper = styled.div`
	position: relative;
	z-index: 3;

	//?The dropdown container
	.dropdown {
		display: flex;
		flex-direction: column;
		position: relative;

		//?show dropdown;
		&:hover .dropdown-content-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.dropbtn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			border-radius: 50%;
		}

		&:hover {
			cursor: pointer;

			#username {
				color: hsla(200, 30%, 50%, 1);
			}

			#profile-svg {
				fill: hsla(200, 100%, 35%, 1);
			}
		}
	}

	//?dropdown
	.dropdown-content-wrapper {
		display: none;
		text-align: left;
		position: absolute;
		width: 100%;
		top: 100%;
		z-index: 1;

		.dropdown-content {
			margin-top: 5px;
			overflow: hidden;
			box-shadow: 0 1px 3px 0 rgb(105 113 122 / 32%);
		}
	}
`;

const MenuDropdown = ({ linksArr, currentUser }) => {
	const renderLinks = (links) => {
		return links.map((link, idx) => {
			let result;

			if (link.handler)
				result = (
					<MenuButton onClick={link.handler} key={`menu-link-${idx}`}>
						{link.name}
					</MenuButton>
				);
			else
				result = (
					<MenuLink to={link.to} key={`menu-link-${idx}`}>
						{link.name}
					</MenuLink>
				);

			return result;
		});
	};

	return (
		<Wrapper>
			{' '}
			<div className="dropdown">
				<div className="dropbtn">
					<span id="username">{`${
						currentUser
							? `${currentUser.firstname} ${currentUser.lastname}`
							: ''
					}`}</span>
					<MyProfile id="profile-svg" width={30} height={30}></MyProfile>
				</div>

				<div className="dropdown-content-wrapper">
					<div className="dropdown-content">{renderLinks(linksArr)}</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default MenuDropdown;
