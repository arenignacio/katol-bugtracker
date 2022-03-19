import styled from 'styled-components';

const Container = styled.form`
	padding: 10px 50px;

	.row {
		display: flex;
		width: 100%;
	}

	.input {
		margin-bottom: 20px;

		label {
			font-size: 0.9rem;
		}

		input {
			margin: 5px 15px 0px 0px;
			padding: 5px;
			border-radius: 5px;
			border: 1px solid rgba(0, 0, 0, 0.5);
			outline: none;
			font-size: 0.7rem;
		}

		textarea {
			margin: 5px 15px 0px 0px;
		}
	}
`;

const ProjectForm = () => {
	return (
		<Container>
			<div className="row">
				<div className="input">
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
				<div className="input">
					<label htmlFor="">Description</label>
					<br />
					<textarea name="" id="" cols="30" rows="10"></textarea>
				</div>
			</div>
		</Container>
	);
};

export default ProjectForm;
