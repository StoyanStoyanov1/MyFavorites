import React from "react";
import {authFormKeys} from "../../utils/formKeys/authFormKeys.js";
import {Link} from "react-router-dom";
import Path from './../../utils/paths.js'
import languageHeader from "../../utils/languages/languageHeader.js";
import {useLanguage} from "../../context/LanguageContext.jsx";
import languageAuth from "../../utils/languages/languageAuth.js";


export default function Login() {
	const [ language ] = useLanguage()
	return (
		<section id='authentication'>
			<form >
				<fieldset>
					<legend>{languageHeader.login[language]}</legend>
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
							placeholder={languageAuth.enterYourPassword[language]}
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


					<button type="submit" className='auth-button'>{languageHeader.login[language]}</button>

					<p className='auth-field'>

						{language === 'en' ? <span>If you do not have a profile, click <Link to={Path.Register}>Here</Link></span> :
							language === 'de' ? <span>Wenn Sie noch kein Profil haben, klicken Sie <Link to={Path.Register}>hier</Link></span> :
								<span>Ако нямате профил, кликнете <Link to={Path.Register}>тук</Link></span>}

					</p>
				</fieldset>
			</form>
		</section>
	)
}