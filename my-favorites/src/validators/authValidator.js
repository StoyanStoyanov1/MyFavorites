import {authFormKeys} from "../utils/formKeys/authFormKeys.js";
import translateAuthValidator from "../utils/translator/translateAuthValidators.js";
import {useLanguage} from "../context/LanguageContext.jsx";

export default function authValidator(values, validator, language) {
	let inputIsValid = true;

	const validatorMessages = validator;
	if (!values[authFormKeys.Email]) {
		validatorMessages[authFormKeys.Email] = translateAuthValidator.noEmail[language];
		inputIsValid = false;
	}

	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[authFormKeys.Email])) {
		validatorMessages[authFormKeys.Email] = translateAuthValidator.validateEmail[language];
		inputIsValid = false;
	}

	if (!validatePassword(values[authFormKeys.Password])) {
		validatorMessages[authFormKeys.Password] = translateAuthValidator.password[language];
		inputIsValid = false;
	}

	if (values[authFormKeys.ConfirmPassword] !== values[authFormKeys.Password]) {
		validatorMessages[authFormKeys.ConfirmPassword] = translateAuthValidator.confirmPassword[language];
		inputIsValid = false;
	}

	if (values[authFormKeys.Username].length < 2 || values[authFormKeys.Username].length > 12) {
		validatorMessages[authFormKeys.Username] = translateAuthValidator.username[language];
		inputIsValid = false;
	}

	if (!values[authFormKeys.BirthDate]) {
		validatorMessages[authFormKeys.BirthDate] = translateAuthValidator.birthDate[language];
		inputIsValid = false;
	}

	return {inputIsValid, validatorMessages}
}


function validatePassword(password) {
	if (password.length < 6) {
		return false;
	}
	if (!/[a-z]/.test(password)) {
		return false;
	}
	if (!/[A-Z]/.test(password)) {
		return false;
	}
	if (!/[0-9]/.test(password)) {
		return false;
	}
	return true;
}