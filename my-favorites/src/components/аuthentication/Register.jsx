import React from "react";
import {authFormKeys} from "../../utils/formKeys/authFormKeys.js";
import {Link} from "react-router-dom";
import Path from './../../utils/paths.js'
import languageAuth from "../../utils/languages/languageAuth.js";
import languageHeader from "../../utils/languages/languageHeader.js";
import {useLanguage} from "../../context/LanguageContext.jsx";

export default function Register() {
	const [ language ] = useLanguage();
	return (
		<section id='authentication'>
			<form >
				<fieldset>
					<legend>{languageHeader.register[language]}</legend>
					<div className='input-container'>
						<label htmlFor={authFormKeys.Email} className='auth-input'>Email</label>
						<input
							id={authFormKeys.Email}
							className={authFormKeys.Email}
							name={authFormKeys.Email}
							type="text"
							placeholder={languageAuth.enterYourEmail[language]}
						/>
					</div>
					<div className='input-container'>
						<label htmlFor={authFormKeys.Password} className='auth-input'>{languageAuth.password[language]}</label>
						<input
							id={authFormKeys.Password}
							className={authFormKeys.Password}
							name={authFormKeys.Password}
							type="password"
							placeholder={languageAuth.enterYourEmail[language]}
						/>
					</div>
					<div className='input-container'>
						<label htmlFor={authFormKeys.ConfirmPassword} className='auth-input'>{languageAuth.confPassword[language]}</label>
						<input
							id={authFormKeys.ConfirmPassword}
							className={authFormKeys.ConfirmPassword}
							name={authFormKeys.ConfirmPassword}
							type="password"
							placeholder={languageAuth.enterYourConfPassword[language]}
						/>
					</div>
					<div className='input-container'>
						<label htmlFor='username' className='auth-input'>{languageAuth.username[language]}</label>
						<input
							id={authFormKeys.Username}
							className={authFormKeys.Username}
							name={authFormKeys.Username}
							type="text"
							placeholder={languageAuth.yourUsername[language]}
						/>
					</div>


					<button type="submit" className='auth-button'>{languageHeader.register[language]}</button>

					<p className='auth-field'>
						{language === 'en' ? <span>If you already have profile click <Link to={Path.Login}>Here</Link></span>:
							language === 'de' ? <span>Wenn Sie bereits ein Profil haben, klicken Sie <Link to={Path.Login}>hier</Link></span>:
								<span>Ако вече имате профил, кликнете <Link to={Path.Login}>тук</Link></span>}
					</p>
				</fieldset>
			</form>
		</section>
	)
}