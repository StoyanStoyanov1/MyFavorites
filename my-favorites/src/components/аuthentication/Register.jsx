import React, {useEffect, useState} from "react";
import {authFormKeys} from "../../utils/formKeys/authFormKeys.js";
import {Link} from "react-router-dom";
import Path from './../../utils/paths.js'
import translateAuth from "../../utils/translator/translateAuth.js";
import translateHeader from "../../utils/translator/translateHeader.js";
import {useLanguage} from "../../context/LanguageContext.jsx";
import useSelected from "../../hooks/useSelected.js"

export default function Register() {
	const [ language ] = useLanguage();

	const [maxDate, setMaxDate] = useState('');

	const {selected, onChangeSelected} = useSelected('other');

	useEffect(() => {
		const today = new Date().toISOString().split('T')[0];
		setMaxDate(today);
	}, []);
	return (
		<section id='authentication'>
			<form >
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
						/>
					</div>
					<div className='input-container'>
						<label htmlFor={authFormKeys.Password}
							   className='auth-input'>{translateAuth.password[language]}</label>
						<input
							id={authFormKeys.Password}
							className={authFormKeys.Password}
							name={authFormKeys.Password}
							type="password"
							placeholder={translateAuth.enterYourEmail[language]}
						/>
					</div>
					<div className='input-container'>
						<label htmlFor={authFormKeys.ConfirmPassword}
							   className='auth-input'>{translateAuth.confPassword[language]}</label>
						<input
							id={authFormKeys.ConfirmPassword}
							className={authFormKeys.ConfirmPassword}
							name={authFormKeys.ConfirmPassword}
							type="password"
							placeholder={translateAuth.enterYourConfPassword[language]}
						/>
					</div>
					<div className='input-container'>
						<label htmlFor='username' className='auth-input'>{translateAuth.username[language]}</label>
						<input
							id={authFormKeys.Username}
							className={authFormKeys.Username}
							name={authFormKeys.Username}
							type="text"
							placeholder={translateAuth.yourUsername[language]}
						/>
					</div>

					<div className='input-container'>
						<label htmlFor='gender' className='auth-input'>{translateAuth.gender[language]}</label>
						<div className="gender-form">
							<label>
								<input
									type="radio"
									name="gender"
									value="other"
									onChange={onChangeSelected}
									checked={selected === 'other'}
								/>
								{translateAuth.other[language]}
							</label>
							<label>
								<input
									type="radio"
									name="gender"
									value="male"
									onChange={onChangeSelected}
									checked={selected === 'male'}
								/>
								{translateAuth.male[language]}
							</label>
							<label>
								<input
									type="radio"
									name="gender"
									value="female"
									onChange={onChangeSelected}
									checked={selected === 'female'}
								/>
								{translateAuth.female[language]}
							</label>

						</div>
					</div>

					<div className='input-container'>
						<label htmlFor='dateOfBirth' className='auth-input'>{translateAuth.dateOfBirth[language]}</label>
						<div className='birthDate-Form' >
						<input type='date' id='date' name='date' max={maxDate}/>
						</div>
					</div>




					<button type="submit" className='auth-button'>{translateHeader.register[language]}</button>

					<p className='auth-field'>
						{language === 'en' ?
							<span>If you already have profile click <Link to={Path.Login}>Here</Link></span> :
							language === 'de' ? <span>Wenn Sie bereits ein Profil haben, klicken Sie <Link
									to={Path.Login}>hier</Link></span> :
								<span>Ако вече имате профил, кликнете <Link to={Path.Login}>тук</Link></span>}
					</p>
				</fieldset>
			</form>
		</section>
	)
}