import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	position: fixed;
	background: white;
	box-sizing: border-box;
	height: 100%;
	width: 15%;
	min-width: 200px;
	padding: 30px;
	z-index: 2;
	box-shadow: 5px 0px 18px -10px rgba(0, 0, 0, 0.3);

	#nav-menu {
		margin-top: 10px;
		color: rgba(0, 0, 0, 0.5);

		span {
			user-select: none;
			font-weight: 200;

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

			ul {
				margin: 5px 0px 0px 10px;
				> li {
					margin-top: 2px;
				}
			}
		}
	}
`;

const Navigation = ({ widthSize, setActivePage }) => {
	const navigate = useNavigate();

	return (
		<Wrapper widthSize={widthSize}>
			<ul id="nav-menu">
				<li>
					<span id="dashboard" onClick={(e) => navigate('/dashboard')}>
						Dashboard
					</span>
				</li>
				<li>
					<span>Projects </span>
					<ul>
						<li>
							<span>Project 1</span>
						</li>
						<li>
							<span>Project 2</span>
						</li>
						<li>
							<span>Project 3</span>
						</li>
						<li>
							<span>Project 4</span>
						</li>
					</ul>
				</li>
				<li>
					<span>Tickets</span>
				</li>
				<li>
					<span>Settings </span>
					<ul>
						<li>
							<span>General</span>
						</li>
						<li>
							<span>Style</span>
						</li>
						<li>
							<span>FAQ</span>
						</li>
					</ul>
				</li>
			</ul>
		</Wrapper>
	);
};

export default Navigation;
