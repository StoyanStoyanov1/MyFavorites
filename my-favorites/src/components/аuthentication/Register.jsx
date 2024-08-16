import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Path from './../../utils/paths.js';
import translateAuth from "../../utils/translator/translateAuth.js";
import translateHeader from "../../utils/translator/translateHeader.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import useSelected from "../../hooks/useSelected.js";
import useForm from "../../hooks/useForm.js";
import { authFormKeys } from "../../utils/formKeys/authFormKeys.js";
import authContext from "../../context/authContext.jsx";

export default function Register() {
	const [language] = useLanguage();
	const { registerSubmitHandler } = useContext(authContext);

	const [maxDate, setMaxDate] = useState('');

	const { values, onChange, onSubmit } = useForm(submitHandler, {
		[authFormKeys.Email]: '',
		[authFormKeys.Password]: '',
		[authFormKeys.ConfirmPassword]: '',
		[authFormKeys.Username]: '',
		[authFormKeys.Gender]: 'other',
		[authFormKeys.BirthDate]: '',
		[authFormKeys.Aktiv]: false,
	});

	useEffect(() => {
		const today = new Date().toISOString().split('T')[0];
		setMaxDate(today);
	}, []);

	async function submitHandler(values) {
		try {
			await registerSubmitHandler(values);
		} catch (error) {
			console.error('Error during registration:', error);
		}
	}

	return (
		<section id='authentication'>
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>{translateHeader.register[language]}</legend>

					<div className='input-container'>
						<label htmlFor={authFormKeys.Email} className='auth-input'>Email</label>
						<input
							id={authFormKeys.Email}
							className={authFormKeys.Email}
							name={authFormKeys.Email}
							type="text"
							placeholder={translateAuth.enterYourEmail[language]}
							onChange={onChange}
							value={values[authFormKeys.Email]}
						/>
					</div>

					<div className='input-container'>
						<label htmlFor={authFormKeys.Password} className='auth-input'>{translateAuth.password[language]}</label>
						<input
							id={authFormKeys.Password}
							className={authFormKeys.Password}
							name={authFormKeys.Password}
							type="password"
							placeholder={translateAuth.enterYourPassword[language]}
							onChange={onChange}
							value={values[authFormKeys.Password]}
						/>
					</div>

					<div className='input-container'>
						<label htmlFor={authFormKeys.ConfirmPassword} className='auth-input'>{translateAuth.confPassword[language]}</label>
						<input
							id={authFormKeys.ConfirmPassword}
							className={authFormKeys.ConfirmPassword}
							name={authFormKeys.ConfirmPassword}
							type="password"
							placeholder={translateAuth.enterYourConfPassword[language]}
							onChange={onChange}
							value={values[authFormKeys.ConfirmPassword]}
						/>
					</div>

					<div className='input-container'>
						<label htmlFor={authFormKeys.Username} className='auth-input'>{translateAuth.username[language]}</label>
						<input
							id={authFormKeys.Username}
							className={authFormKeys.Username}
							name={authFormKeys.Username}
							type="text"
							placeholder={translateAuth.yourUsername[language]}
							onChange={onChange}
							value={values[authFormKeys.Username]}
						/>
					</div>

					<div className='input-container'>
						<label htmlFor={authFormKeys.Gender} className='auth-input'>{translateAuth.gender[language]}</label>
						<div className="gender-form">
							<label>
								<input
									type="radio"
									name={authFormKeys.Gender}
									value="other"
									onChange={onChange}
									checked={values[authFormKeys.Gender] === 'other'}
								/>
								{translateAuth.other[language]}
							</label>
							<label>
								<input
									type="radio"
									name={authFormKeys.Gender}
									value="male"
									onChange={onChange}
									checked={values[authFormKeys.Gender] === 'male'}
								/>
								{translateAuth.male[language]}
							</label>
							<label>
								<input
									type="radio"
									name={authFormKeys.Gender}
									value="female"
									onChange={onChange}
									checked={values[authFormKeys.Gender] === 'female'}
								/>
								{translateAuth.female[language]}
							</label>
						</div>
					</div>

					<div className='input-container'>
						<label htmlFor={authFormKeys.BirthDate} className='auth-input'>{translateAuth.dateOfBirth[language]}</label>
						<div className='birthDate-Form'>
							<input
								type='date'
								id={authFormKeys.BirthDate}
								name={authFormKeys.BirthDate}
								max={maxDate}
								onChange={onChange}
								value={values[authFormKeys.BirthDate]}
							/>
						</div>
					</div>

					<button type="submit" className='auth-button'>{translateHeader.register[language]}</button>

					<p className='auth-field'>
						{language === 'en' ?
							<span>If you already have a profile, click <Link to={Path.Login}>Here</Link></span> :
							language === 'de' ? <span>Wenn Sie bereits ein Profil haben, klicken Sie <Link to={Path.Login}>hier</Link></span> :
								<span>Ако вече имате профил, кликнете <Link to={Path.Login}>тук</Link></span>}
					</p>
				</fieldset>
			</form>
		</section>
	);
}
