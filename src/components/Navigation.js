import styled from 'styled-components';

const Wrapper = styled.div`
	background: white;
	box-sizing: border-box;
	height: 100%;
	width: ${({ widthSize }) => {
		return widthSize ? widthSize : '15%';
	}};
	min-width: 200px;
	padding: 30px;
	z-index: 1;
	box-shadow: 5px 0px 18px -10px rgba(0, 0, 0, 0.3);

	#nav-menu {
		margin-top: 10px;
		color: rgba(0, 0, 0, 0.6);

		span {
			user-select: none;

			&:hover {
				font-weight: 900;
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

const Navigation = ({ widthSize }) => {
	return (
		<Wrapper widthSize={widthSize}>
			<ul id="nav-menu">
				<li>
					<span>Dashboard</span>
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
