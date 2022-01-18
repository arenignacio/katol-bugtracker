import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//#context import
import { UserContext } from '../App';

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
				height: 120px;
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

					input {
						text-align: center;
						width: 110px;
						height: 14px;
						outline: none;
						border: 1px solid rgba(0,0,0, 0.2);
						border-radius: 3px;
						background: rgba(0,0,0, 0.1);
						font-size: 0.7rem;
					}
				}
			}

			#about-me-grp {
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				padding: 5px 25px;

				#textarea-grp {
					min-width: 95%;
					max-width: 95%; 

					textarea {
					box-sizing: border-box;
					text-align: left;
					min-width: 100%;
					max-width: 100%;
					min-height: 95px;
					outline: none;
					border: 1px solid rgba(0,0,0, 0.2);
					border-radius: 3px;
					background: rgba(0,0,0, 0.1);
					font-size: 0.8rem;
					padding: 0.5rem;
					color: rgba(0,0,0, 0.8)
					}

					div:last-of-type {
						display: flex;
						justify-content: end;
						font-size: 0.7rem;
					}
				}
	
				#about-me-label {
					display: flex;
					justify-content: center;
					margin-bottom: 5px;
					font-weight: bold;
				}

				#about-me-content {
					text-align: left;
					width: 100%;
					min-height: 50px;
					color: rgba(0,0,0, 0.6);
				}

			
			}


			#btn-grp {
				display: flex;
				justify-content: center;
				height: 2.5rem;
				margin: 15px 0px;
				font-weight: bold;

				div {
					display: flex;
					justify-content: space-evenly;
					height: fit-content;
					width: 40%;

					.btn {
						&:hover {
							cursor: pointer;
							color: rgba(0,0,0, 0.6);
						}

						&:active {
							color: rgba(0,0,0, 0.4);
						}
					}
				}
			}
		}

	}
`;

const MyProfile = () => {
	const [editMode, setEditMode] = useState(false);
	const [charsLeft, setCharsLeft] = useState(200);
	const [user, setUser] = useContext(UserContext);
	const [formValues, setFormValues] = useState({ ...user });
	const navigate = useNavigate();

	console.log(user);

	useEffect(() => {
		if (!user) {
			navigate('../');
		}

		setCharsLeft(200 - formValues.aboutme.length);
	}, [formValues, navigate, user]);

	const toggleEdit = async () => {
		await setEditMode(!editMode);
	};

	const resetForm = async () => {
		await setFormValues(user);
		toggleEdit();
	};

	const handleInputChange = async (e) => {
		const { name, value } = e.target;

		await setFormValues((prevVal) => {
			return { ...prevVal, [name]: value };
		});

		console.log(formValues);
	};

	const updateUser = async () => {
		await setUser({ ...formValues });
		toggleEdit();
	};

	const calculateCharsLeft = () => {
		setCharsLeft(200 - formValues.aboutme.length);
	};

	const renderFields = (fields) => {
		const fieldsArr = Object.entries(fields);

		return fieldsArr.reduce((acc, cur) => {
			const key = cur[0];

			if (key !== 'aboutme')
				acc.push(
					<div>
						<label htmlFor={key}>
							{key === 'email'
								? 'E-mail'
								: key[0].toUpperCase() + key.substring(1)}
						</label>
						{editMode && key !== 'username' ? (
							<input
								type="text"
								name={key}
								value={fields[key]}
								onChange={handleInputChange}
							/>
						) : (
							<span>{fields[key]}</span>
						)}
					</div>
				);

			return acc;
		}, []);
	};

	return (
		<Wrapper>
			<div id="layer1">My profile</div>
			<div id="layer2">
				<div id="account-details">
					<div id="header">
						<div id="profile-pic">JD</div>
					</div>

					<div id="personal-info">{renderFields(({} = formValues))}</div>

					<div id="about-me-grp">
						<div id="about-me-label">About me</div>
						{editMode ? (
							<div id="textarea-grp">
								<textarea
									name="aboutme"
									onChange={async (e) => {
										await handleInputChange(e);
									}}
									maxLength={200}
									value={formValues.aboutme}
								></textarea>
								<div>
									chars remaining &nbsp;<span>{charsLeft}</span>/200
								</div>
							</div>
						) : (
							<div id="about-me-content">{formValues.aboutme}</div>
						)}
					</div>

					<div id="btn-grp">
						{editMode ? (
							<div>
								<div
									className="btn"
									onClick={() => {
										updateUser();
									}}
								>
									save
								</div>
								<div
									className="btn"
									onClick={() => {
										resetForm();
									}}
								>
									cancel
								</div>
							</div>
						) : (
							<div>
								<div className="btn" onClick={toggleEdit}>
									edit
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default MyProfile;
