import { recommendFormKeys } from "../utils/formKeys/recommendFormKeys.js";
import translateRecommendValidators from "../utils/translator/translateRecommendValidators.js";

export default function recommendValidator(values, validator, language) {
	let inputIsValid = true;

	const validatorMessages = { ...validator };

	if (!values[recommendFormKeys.Title] || values[recommendFormKeys.Title].length < 2) {
		validatorMessages[recommendFormKeys.Title] = translateRecommendValidators.title[language];
		inputIsValid = false;
	}

	if (!values[recommendFormKeys.Genre]) {
		validatorMessages[recommendFormKeys.Genre] = translateRecommendValidators.genre[language];
		inputIsValid = false;
	}

	if (!values[recommendFormKeys.Year]) {
		validatorMessages[recommendFormKeys.Year] = translateRecommendValidators.year[language];
		inputIsValid = false;
	}

	if (!values[recommendFormKeys.Description] || values[recommendFormKeys.Description].length < 20) {
		validatorMessages[recommendFormKeys.Description] = translateRecommendValidators.description[language];
		inputIsValid = false;
	}

	if (values[recommendFormKeys.Image] !== '' && !/^https?:\/\//.test(values[recommendFormKeys.Image])) {
		validatorMessages[recommendFormKeys.Image] = translateRecommendValidators.image[language]
		inputIsValid = false;
	}
	return { inputIsValid, validatorMessages };
}
