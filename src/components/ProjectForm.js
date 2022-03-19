import styled from 'styled-components';

const Container = styled.form`
	display: flex;
	width: 50vw;
	padding: 25px 50px;

	> div {
		width: 40%;

		&:first-child {
			width: 60%;
		}
	}

	.row {
		display: flex;
		width: 100%;
	}

	.input {
		width: 40%;
		margin-bottom: 20px;

		&.project-field {
			width: 60%;
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
			border-radius: 5px;
			border: 1px solid rgba(0, 0, 0, 0.3);
			outline: none;
			font-size: 0.7rem;
			width: 90%;
		}

		textarea {
			width: 95%;
			height: 125px;
			outline: none;
			resize: none;
			border: 1px solid rgba(0, 0, 0, 0.3);
			margin: 5px 15px 0px 0px;
			padding: 5px;
		}
	}
`;

const ProjectForm = () => {
	return (
		<Container>
			<div>
				<div className="row">
					<div className="input project-field">
						<label>Project Name</label>
						<br />
						<input type="text" name="" id="" />
					</div>
					<div className="input">
						<label> Project Managers</label>
						<br />
						<input type="text" name="" id="" />
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
			<div>asda</div>
		</Container>
	);
};

export default ProjectForm;
