/* takes in  object with the following data
{
	fetchData: object, 
	fields: array, //of fields object 
	buttons: array
}

fetchData {
	url: urlString,
	options: options object {method, header, and body}
} 

fields [fields object]

buttons [submit button: object, other buttons: object..]
each button object must contain {name: string, handler: callback}
*/

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 25px;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;

		.field {
			display: flex;
			flex-direction: column;	
		}

		label {
			position: relative;
			margin: 0px 0px 4px 4px;
			font-size: 0.8rem;
			z-index: 1;
		}

		input[type='text'],
		input[type='password'],
		input[type='email'], .dropdown-container, 
		textarea {
			width: 225px;
			height: 1.5rem;
			margin-bottom: 10px;
			border-radius: 5px;
			box-sizing: border-box;
			outline: none;
			padding: 0px 10px;
			font-family: serif;
			font-size: 0.7rem;
			border: 1px solid rgba(0, 0, 0, 0.3);
			

			&::placeholder {
				color: rgba(0,0,0, 0.4);
			}
		}

		textarea {
			padding: 10px;

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

		.dropdown-container {
			position: relative;
			padding: 0px;
			height: fit-content;
			border-radius: 5px;

			&.active {
				border-radius: 5px 5px 0px 0px;
				
				.option-selected {
					border-radius: 5px 5px 0px 0px;
				}

				.dropdown {
					display: flex;
				}
			}
		}

		.dropdown {
			background: white;
			position: absolute;
			display: none;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: fit-content;
			z-index: 2;
			border-radius: 0px 0px 5px 5px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		

			&-label {
				font-size: 1.2rem;
			}
		}

		.option-selected, input {
			overflow: hidden;
			position: relative;
			z-index: 1;
		}

		.option-selected, .option {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			width: 100%;
			height: 1.5rem;
			box-sizing: border-box;
			padding: 0px 10px;
			background: white;

			.toggle-option {
				&:hover {
					cursor: pointer;
				}
			}
		}

		.option{
			border-left: 1px solid rgba(0, 0, 0, 0.3);
			border-right: 1px solid rgba(0, 0, 0, 0.2);
			border-top: 1px solid rgba(0,0,0, 0.2);
			width: 101%;

			&-selected {
				border-radius: 5px;
				display: flex;
				justify-content: space-between;
			}

		

			&:hover{ 
				cursor: pointer;

				span {
					transform: scale(1.1);
				}
			}
		
			&:last-of-type {
				
				border-radius: 0px 0px 5px 5px;
			} 
		}

		

	}

	.hidden {
		display: none;
	}
`;

/*
options {
	fetchData, fields, buttons 
}
*/

export class field {
	constructor(
		label,
		name,
		placeholder,
		type = 'text',
		value = '',
		options = null
	) {
		this.label = label;
		this.name = name;
		this.placeholder = placeholder || name;
		this.value = value;
		this.type = type;
		this.options = options;
	}
}

const Form = ({ options, handleErrorMsg }) => {
	//#constants
	const fields = options.fields;
	const fetchData = options.fetchData;
	const [submitBtn, ...buttons] = options.buttons;

	//#states
	const [formValues, setFormValues] = useState(null);
	const [activeDropdown, setActiveDropdown] = useState(null);

	useEffect(() => {
		const initialFormValues = fields.reduce((acc, field) => {
			acc[field.name] = field.value;

			return acc;
		}, {});
		setFormValues(initialFormValues);
	}, [fields]);

	useEffect(() => {}, [activeDropdown]);

	//#handle input change in forms
	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormValues((prevState) => {
			return { ...prevState, [id]: value };
		});
	};

	//#handle option select for dropdown
	const handleOptionSelect = (key, option) => {
		setActiveDropdown(null);
		setFormValues((prevVal) => {
			return { ...prevVal, [key]: option };
		});
	};

	//#handle form submit
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		let res; //response
		const dataHandler = submitBtn.handler;
		handleErrorMsg(null);

		//?fetchData is data to be fed into fetch command
		//add formvalues to options to complete fetch data
		fetchData.options.body = JSON.stringify({
			...fetchData.options.body,
			...formValues,
		});

		res = await fetch(fetchData.url, fetchData.options);

		if (res.ok) {
			const data = await res.json();
			if (typeof dataHandler === 'function') dataHandler(data);
		} else if (res.status === 401) {
			fetchData.options.body = JSON.parse(fetchData.options.body);
			handleErrorMsg('Invalid login');
		} else if (res.status === 403) {
			fetchData.options.body = JSON.parse(fetchData.options.body);
			console.log(res.json());
			handleErrorMsg('Unauthorized action');
		} else if (res.status === 422) {
			fetchData.options.body = JSON.parse(fetchData.options.body);
			handleErrorMsg('Please fill in all required fields');
		} else {
			const err = await res.json();
			console.log(err);
			fetchData.options.body = JSON.parse(fetchData.options.body);
			handleErrorMsg(err);
		}
	};

	const renderFields = (fields) => {
		return fields.map((field, idx) => {
			const { label, name: key, placeholder, type } = field;

			if (type === 'textarea') {
				const options = field.options;

				return (
					<div key={`key-${key + idx}`} className="field">
						<label htmlFor={key}>{label}</label>
						<textarea
							type={type}
							id={key}
							placeholder={placeholder}
							onChange={handleInputChange}
							value={formValues[key]}
							maxLength={options.maxLength ? options.maxLength : ''}
							autoComplete="on"
						/>
					</div>
				);
			}

			if (type === 'select') {
				return (
					<div key={`key-${key + idx}`} className="field">
						<label htmlFor={key}>{label}</label>
						<div
							className={`dropdown-container ${
								activeDropdown === key ? 'active' : ''
							}`}
							id={key}
							autoComplete="on"
						>
							<div className={`option-selected`}>
								{formValues[key]}
								<div
									className={`toggle-option ${key} ${
										field.options.length <= 1 ? 'hidden' : ''
									}`}
									onClick={() => {
										if (activeDropdown === key) {
											setActiveDropdown(null);
										} else setActiveDropdown(key);
									}}
								>
									open
								</div>
							</div>
							<div className={`dropdown ${key}`}>
								{field.options.map((option) => {
									if (option === formValues[key]) return '';

									return (
										<div
											className="option"
											onClick={() => {
												handleOptionSelect(key, option);
											}}
										>
											<span>{option}</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				);
			}

			return (
				<div key={`key-${key + idx}`} className="field">
					<label htmlFor={key}>{label}</label>
					<input
						type={type}
						id={key}
						placeholder={placeholder}
						onChange={handleInputChange}
						value={formValues[key]}
						autoComplete="on"
					/>
				</div>
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

	//# handle dropdown when clicking outside of dropdown
	const dropdownHandler = (e) => {
		const classes = e.target.className;

		if (activeDropdown && !classes.includes(activeDropdown)) {
			setActiveDropdown(null);
		}

		if (
			classes.includes('toggle-option') &&
			!classes.includes(activeDropdown)
		) {
			setActiveDropdown(classes.split(' ')[1]);
		}
	};

	return formValues ? (
		<Wrapper onClick={dropdownHandler} buttons={buttons}>
			<form onSubmit={onSubmitHandler}>
				{fields ? renderFields(fields) : ''}
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
	) : (
		''
	);
};

export default Form;
