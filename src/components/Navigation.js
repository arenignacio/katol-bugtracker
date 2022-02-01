import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	position: fixed;
	background: white;
	box-sizing: border-box;
	height: 95%;
	width: 10vw;
	min-width: fit-content;
	padding: 30px;
	font-size: 0.9rem;
	z-index: 2;
	box-shadow: 5px 0px 18px -10px rgba(0, 0, 0, 0.3);

	#nav-menu {
		margin-top: 10px;
		color: rgba(0, 0, 0, 0.5);

		span {
			user-select: none;
			font-weight: 200;
			font-family: montserrat;
			background: none;
			border: 0px;
			color: rgba(0, 0, 0, 0.5);

			&:hover {
				font-weight: 500;
				color: rgba(0, 0, 0, 0.9);
				cursor: pointer;
			}

			&:active {
				color: rgba(0, 0, 0, 0.5);
			}
		}

		> li {
			margin-bottom: 20px;

			.active {
				font-weight: bold;
				color: rgba(0, 0, 0, 0.8);
			}

			ul {
				margin: 5px 0px 0px 10px;
				> li {
					margin-top: 2px;
				}
			}
		}
	}
`;

const Navigation = ({ navLinks }) => {
	const navigate = useNavigate();
	const [activeBtn, setActiveBtn] = useState();

	const renderLinks = (navLinks) =>
		navLinks.map((name) => {
			return (
				<li>
					<span
						id={name}
						className={activeBtn === name ? 'active' : ''}
						onClick={(e) => {
							setActiveBtn(name);
							console.log(e.target);
							navigate(`/${name}`);
						}}
					>
						{name[0].toUpperCase() + name.substring(1)}
					</span>
				</li>
			);
		});

	return (
		<Wrapper>
			<ul id="nav-menu">{renderLinks(navLinks)}</ul>
		</Wrapper>
	);
};

export default Navigation;
