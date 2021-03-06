import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { API_BASEURL } from '../utils/constants';
import requests from '../utils/requests';

//#context import
import { UserContext } from '../App';
import { useOutletContext } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	height: 100%;

	background: rgba(0, 0, 0, 0.1);
	z-index: 1;
	padding: 25px 30px;

	#layer1 {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		font-size: 2rem;
	}

	#layer2 {
		display: flex;
		justify-content: space-evenly;
		width: 80%;

		#account-details {
			width: 42%;
			min-width: 400px;
			min-height: 75%;
			box-sizing: border-box;
			border-radius: 5px;
			background: white;
			box-shadow: 0px 5px 5px 1px rgba(0 0 0 / 30%);
			border: 1px solid rgba(0, 0, 0, 0.3);
			overflow: hidden;

			#header {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				width: 100%;
				height: 120px;
				background: rgba(0, 0, 0, 0.2);

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
						border: 1px solid rgba(0, 0, 0, 0.2);
						border-radius: 3px;
						background: rgba(0, 0, 0, 0.1);
						font-size: 0.7rem;
						font-family: ;
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
						border: 1px solid rgba(0, 0, 0, 0.2);
						border-radius: 3px;
						background: rgba(0, 0, 0, 0.1);
						font-size: 0.8rem;
						padding: 0.5rem;
						color: rgba(0, 0, 0, 0.8);
						font-family: 'Time New Roman', Serif;
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
					color: rgba(0, 0, 0, 0.6);
					word-break: break-all;
				}
			}

			#btn-grp {
				display: flex;
				justify-content: center;
				height: 2.5rem;
				margin: 15px 0px;
				font-weight: bold;

				div,
				input {
					display: flex;
					justify-content: space-evenly;
					height: fit-content;
					width: 40%;
					border: none;
					background: white;
					font-size: 16px;
					font-family: 'times new roman';
					font-weight: bold;
					padding: 0px;

					.btn {
						text-decoration: underline;

						&:hover {
							cursor: pointer;
							color: rgba(0, 0, 0, 0.6);
						}

						&:active {
							color: rgba(0, 0, 0, 0.4);
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
	const [formValues, setFormValues] = useState();

	const { activeBtn, setActiveBtn } = useOutletContext();
	const req = requests(API_BASEURL);
	const updateDB = req.put;

	//#update form everytime user changes
	useEffect(() => {
		if (activeBtn !== null) {
			setActiveBtn(null);
		}

		setFormValues(user);
	}, [user]);

	//#count charactersleft when form changes
	useEffect(() => {
		if (formValues) setCharsLeft(200 - formValues.aboutme.length);
	}, [formValues]);

	//#toggle edit mode
	const toggleEdit = async () => {
		await setEditMode(!editMode);
	};

	//#reset form. response for save and cancel buttons
	const resetForm = async () => {
		await setFormValues(user);
		toggleEdit();
	};

	//#update formValues state
	const handleInputChange = async (e) => {
		const { name, value } = e.target;

		await setFormValues((prevVal) => {
			return { ...prevVal, [name]: value };
		});
	};

	const updateUser = async (formValues) => {
		const isFormUpdated = () => {
			for (const key in formValues) {
				if (formValues[key] !== user[key]) return true;
			}

			return false;
		};

		if (isFormUpdated()) {
			updateDB('user/update', formValues);
			setUser(formValues);
		}

		toggleEdit();
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

	return user && formValues ? (
		<Wrapper>
			<div id="layer1">My profile</div>
			<div id="layer2">
				<form
					id="account-details"
					onSubmit={(e) => {
						e.preventDefault();
						updateUser(formValues);
					}}
				>
					<div id="header">
						<div id="profile-pic">
							{user.firstname[0] + user.lastname[0]}
						</div>
					</div>

					<div id="personal-info">{renderFields(formValues)}</div>

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
								<input type="submit" className="btn" value="save" />
								<input
									type="button"
									className="btn"
									onClick={() => {
										resetForm();
									}}
									value="cancel"
								/>
							</div>
						) : (
							<div>
								<div className="btn" onClick={toggleEdit}>
									edit
								</div>
							</div>
						)}
					</div>
				</form>
			</div>
		</Wrapper>
	) : (
		''
	);
};

export default MyProfile;
