import React, { useContext, useState } from "react";
import { authFormKeys } from "../../utils/formKeys/authFormKeys.js";
import { Link } from "react-router-dom";
import Path from '../../paths.js'
import translateHeader from "../../utils/translator/translateHeader.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import translateAuth from "../../utils/translator/translateAuth.js";
import authContext from "../../context/authContext.jsx";
import useForm from "../../hooks/useForm.js"
import translateAuthErrors from "../../utils/translator/translateAuthErrors.js";

export default function Login() {
	const [language] = useLanguage();
	const { loginSubmitHandler } = useContext(authContext);
	const { values, onChange, onSubmit } = useForm(submitHandler, {
		[authFormKeys.Email]: '',
		[authFormKeys.Password]: '',
	});

	const [isLoading, setIsLoading] = useState(false);

	async function submitHandler(values) {
		try {
			await loginSubmitHandler(values);
		} catch (error) {
			let message;

			if (error.message === "User does not exist") message = translateAuthErrors.userNotExist[language];

			else if (error.message === "Invalid password") message = translateAuthErrors.invalidPassword[language];

			alert(message ? message : error.message);
		}
	}

	const validateInput = (e) => {
		if (!values[authFormKeys[e.target.name]] && e.target.value === ' ') {
			return;
		}
		onChange(e);
	}
	return (
		<section id='authentication'>
			{isLoading ? <div className="lds-dual-ring"></div> :
				<form onSubmit={onSubmit}>
					<fieldset>
						<legend>{translateHeader.login[language]}</legend>
						<div className='input-container'>
							<label htmlFor={authFormKeys.Email} className='auth-input'>Email</label>
							<input
								id={authFormKeys.Email}
								className={authFormKeys.Email}
								name={authFormKeys.Email}
								type="text"
								placeholder={translateAuth.enterYourEmail[language]}
								onChange={validateInput}
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
								onChange={validateInput}
								value={values[authFormKeys.Password]}
							/>
						</div>


						<button type="submit" className='auth-button'>{translateHeader.login[language]}</button>

						<p className='auth-field'>

							{language === 'en' ? <span>If you do not have a profile, click <Link to={Path.Register}>Here</Link></span> :
								language === 'de' ? <span>Wenn Sie noch kein Profil haben, klicken Sie <Link to={Path.Register}>hier</Link></span> :
									<span>Ако нямате профил, кликнете <Link to={Path.Register}>тук</Link></span>}

						</p>
					</fieldset>
				</form>}
		</section>
	)
}