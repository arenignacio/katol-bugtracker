import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MenuLink = styled(Link)`
	display: flex;
	white-space: nowrap;
	padding: 10px;
	text-decoration: none;
	font-family: arial;
	font-size: 13px;
	font-weight: bold;
	height: 17px;
	background: hsla(0, 9%, 95%, 1);
	color: rgba(0, 0, 0, 0.5);

	&:hover {
		background: hsla(200, 30%, 80%, 1);
		color: black;
	}
`;

export const MenuButton = styled.div`
	display: flex;
	white-space: nowrap;
	padding: 10px;
	text-decoration: none;
	font-family: arial;
	font-size: 13px;
	font-weight: bold;
	height: 17px;
	background: hsla(0, 9%, 95%, 1);
	color: rgba(0, 0, 0, 0.5);

	&:hover {
		background: hsla(200, 30%, 80%, 1);
		color: black;
	}
`;
