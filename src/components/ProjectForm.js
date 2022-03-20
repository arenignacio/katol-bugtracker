import styled from 'styled-components';

const Container = styled.form`
	display: flex;
	flex-direction: column;
	width: 50vw;
	padding: 25px 50px;

	.fieldsWrapper {
		display: flex;
		min-width: 100%;
		margin-top: 15px;

		div:first-child {
			width: 100%;
		}

		.row {
			display: flex;
			width: 100%;
		}

		.input {
			width: 20%;
			margin-bottom: 20px;

			&.project-field {
				width: 40%;
			}

			&.desc-field {
				width: 100%;
			}

			label {
				font-size: 0.9rem;
			}

			input {
				margin: 5px 15px 0px 0px;
				padding: 5px;
				border: 0px solid rgba(0, 0, 0, 0.2);
				border-bottom: 1px solid rgba(0, 0, 0, 0.3);
				background: rgba(0, 0, 0, 0.1);
				outline: none;
				font-size: 0.7rem;
				width: 90%;
			}

			div {
				margin: 5px 15px 0px 0px;
				padding: 5px;
				font-size: 0.7rem;
				width: 90%;
				border-bottom: 1px solid rgba(0, 0, 0, 0.3);
			}

			textarea {
				width: 95%;
				height: 125px;
				outline: none;
				resize: none;
				border: 0px solid rgba(0, 0, 0, 0.2);
				border-left: 1px solid rgba(0, 0, 0, 0.2);
				border-bottom: 1px solid rgba(0, 0, 0, 0.2);
				background: rgba(0, 0, 0, 0.08);
				margin: 5px 15px 0px 0px;
				padding: 5px;
				font-family: 'times new roman';
			}
		}
	}

	.buttons {
		display: flex;
		justify-content: center;

		input {
			padding: 5px;
			font-size: 1rem;
			border-radius: 5px;
			border: 1px solid rgba(0, 0, 0, 0.3);
			margin-top: 25px;
			margin-left: 50px;

			&:hover {
				cursor: pointer;
			}
		}
	}
`;

const ProjectForm = () => {
	return (
		<Container>
			<div className="notice">Notice: This form is not yet functional</div>
			<div className="fieldsWrapper">
				<div>
					<div className="row">
						<div className="input project-field">
							<label>Project Name</label>
							<br />
							<input type="text" name="" id="" />
						</div>
						<div className="input">
							<label> Project Manager</label>
							<br />
							<div>John Doe</div>
						</div>
					</div>
					<div className="row">
						<div className="input desc-field">
							<label htmlFor="">Description</label>
							<br />
							<textarea name="" id="" cols="30" rows="10"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div className="buttons">
				<input
					type="submit"
					value="Save"
					onClick={(e) => {
						e.preventDefault();
					}}
				/>
				<input type="button" value="Cancel" />
			</div>
		</Container>
	);
};

export default ProjectForm;
