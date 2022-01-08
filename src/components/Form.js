/* takes in  object with the following data
{
	fetchData: object, 
	fields: array, 
	buttons: array
}

fetchData {
	url: urlString,
	options: options object {method, header, and body}
} 

fields [Fields object with key and value, array of placeholders]

buttons [submit button: object, other buttons: object..]
each button object must contain {name: string, handler: callback}
*/

import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;

	

		input[type='text'],
		input[type='password'],
		input[type='email'] {
			width: 225px;
			height: 1.5rem;
			margin-bottom: 10px;
			border-radius: 5px;
			outline: none;
			padding: 0px 10px;
			border: 1px solid rgba(0, 0, 0, 0.3);
		}

		#buttons {
			display: flex;
			justify-content: ${({ buttons }) => {
				if (buttons.length) return 'space-evenly';
				else return 'center';
			}};
			width: 100%;

			input {
				display: flex;
				justify-content: center;
				letter-spacing: 0.5px;
				font-size: ${({ buttons }) => {
					if (buttons.length === 0) return '18px';
					if (buttons.length > 0 && buttons.length < 2) return '15px';
					else return '13px';
				}};
				height: 35px;
				width: ${({ buttons }) => {
					if (buttons.length > 0 && buttons.length < 2) return '100px';
					if (buttons.length === 0) return '150px';
					else return '60px';
				}};
				margin: 10px 0px;
				font-family: 'Mukta', sans-serif;
				font-weight: bold;
				color: rgba(0, 0, 0, 0.7);
				border: 0.5px solid rgba(0, 0, 250, 0.5);
				border-radius: 5px;

				&[type='submit'] {
					background: hsla(190, 40%, 70%, 0.7);

					&:hover {
						color: rgba(0, 0, 0, 0.9);
						background: hsla(190, 60%, 70%, 1);
						cursor: pointer;
					}

					&:active {
						color: white;
						background: hsla(195, 100%, 40%, 1);
					}
				}

				&[type='button'] {
					background: hsla(360, 0%, 50%, 0.7);

					&:hover {
						color: rgba(0, 0, 0, 0.9);
						background: hsla(360, 0%, 60%, 0.7);
						cursor: pointer;
					}

					&:active {
						color: white;
						background: hsla(360, 0%, 50%, 1););
					}
				}
			}
		}
	}
`;

/*
options {
	fetchData, fields, buttons 
}
*/
const Form = ({ options, handleErrorMsg }) => {
	//#constants
	const fields = options.fields;
	const fetchData = options.fetchData;
	const [submitBtn, ...buttons] = options.buttons;

	//#states
	const [formValues, setFormValues] = useState(fields);

	//#handlers
	const handleInputChange = (e) => {
		setFormValues((prevState) => {
			const id = e.target.id;
			return { ...prevState, [id]: e.target.value };
		});
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		let res;
		const dataHandler = submitBtn.handler;
		handleErrorMsg(null);

		//?fetchData is data to be fed into fetch command
		fetchData.options.body = JSON.stringify(formValues);

		res = await fetch(fetchData.url, fetchData.options);

		console.log('res.ok: ' + res.ok);

		if (res.ok) {
			const data = await res.json();
			if (typeof dataHandler === 'function') dataHandler(data);
		} else if (res.status === 401) {
			handleErrorMsg('Invalid email/password');
		} else {
			const err = await res.json();
			console.log(err);
			handleErrorMsg(err);
		}
	};

	const renderFields = (fields, placeholders = []) => {
		const fieldsArr = Object.entries(fields);

		return fieldsArr.map((field, idx) => {
			let type = 'text';
			const [key] = field;
			const placeholder =
				placeholders.length > 0 ? placeholders[idx] : field[0];

			switch (key) {
				case 'password':
					type = 'password';
					break;
				case 'email':
					type = 'email';
					break;
				default:
					break;
			}

			return (
				<input
					type={type}
					id={key}
					placeholder={placeholder}
					onChange={handleInputChange}
					value={formValues[key]}
				/>
			);
		});
	};

	const renderButtons = (buttons) => {
		return buttons.map((btn, idx) => {
			const name = btn.name;
			const handler = btn.handler;

			return (
				<input
					type="button"
					key={`${name}-btn-${idx}`}
					value={name}
					onClick={handler}
				/>
			);
		});
	};

	return (
		<Wrapper buttons={buttons}>
			<form onSubmit={onSubmitHandler}>
				{renderFields(fields[0], fields[1])}
				<div id="buttons">
					{' '}
					<input
						type="submit"
						value={submitBtn ? submitBtn.name : 'Submit'}
					/>
					{buttons.length > 0 ? renderButtons(buttons) : ''}
				</div>
			</form>
		</Wrapper>
	);
};

export default Form;
