import React from "react";
import {authFormKeys} from "../../utils/formKeys/authFormKeys.js";
import {Link} from "react-router-dom";
import Path from './../../utils/paths.js'
import translateHeader from "../../utils/translator/translateHeader.js";
import {useLanguage} from "../../context/LanguageContext.jsx";
import translateAuth from "../../utils/translator/translateAuth.js";


export default function Login() {
	const [ language ] = useLanguage()
	return (
		<section id='authentication'>
			<form >
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
						/>
					</div>


					<button type="submit" className='auth-button'>{translateHeader.login[language]}</button>

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