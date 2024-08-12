import React from "react";
import {authFormKeys} from "../../utils/formKeys/authFormKeys.js";
import {Link} from "react-router-dom";
import Path from './../../utils/paths.js'

export default function Register() {

	return (
		<section id='authentication'>
			<form >
				<fieldset>
					<legend>Register</legend>
					<div className='input-container'>
						<label htmlFor={authFormKeys.Email} className='auth-input'>Email</label>
						<input
							id={authFormKeys.Email}
							className={authFormKeys.Email}
							name={authFormKeys.Email}
							type="text"
							placeholder='Add your email'
						/>
					</div>
					<div className='input-container'>
						<label htmlFor={authFormKeys.Password} className='auth-input'>Password</label>
						<input
							id={authFormKeys.Password}
							className={authFormKeys.Password}
							name={authFormKeys.Password}
							type="password"
							placeholder='Add your password'
						/>
					</div>
					<div className='input-container'>
						<label htmlFor={authFormKeys.ConfirmPassword} className='auth-input'>Confirm Password</label>
						<input
							id={authFormKeys.ConfirmPassword}
							className={authFormKeys.ConfirmPassword}
							name={authFormKeys.ConfirmPassword}
							type="password"
							placeholder='Confirm your password'
						/>
					</div>
					<div className='input-container'>
						<label htmlFor='email' className='auth-input'>Account Name</label>
						<input
							id={authFormKeys.AccName}
							className={authFormKeys.AccName}
							name={authFormKeys.AccName}
							type="text"
							placeholder='Add your accaount name'
						/>
					</div>


					<button type="submit" className='auth-button'>Register</button>

					<p className='auth-field'>
						<span>If you already have profile click <Link to={Path.Login}>Here</Link></span>
					</p>
				</fieldset>
			</form>
		</section>
	)
}