import React, {useContext, useEffect, useState} from "react";
import {recommendFormKeys} from "../../utils/formKeys/recommendFormKeys.js";
import translateRecommend from "../../utils/translator/translateRecommend.js";
import {useLanguage} from "../../context/LanguageContext.jsx";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js"
import useForm from "../../hooks/useForm.js";
import translateAuthErrors from "../../utils/translator/translateAuthErrors.js";
import recommendValidator from "../../validators/recommendValidator.js";
import * as contentService from "../../services/contentService.js"
import {useNavigate, useParams} from "react-router-dom";
import Path from "../../paths.js";
import authContext from "../../context/authContext.jsx";

export default function Recommend() {
	const [language] = useLanguage()
	const {_id} = useContext(authContext);
	const {contentId} = useParams();
	const path = location.pathname;

	const navigate = useNavigate();
	const [validator, setValidator] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [recommendAttempt, setRecommendAttempt] = useState(false);
	const [creatorText, setCreatorText] = useState({});
	const [initialValues, setInitialValues] = useState({
		[recommendFormKeys.Type]: '',
		[recommendFormKeys.Title]: '',
		[recommendFormKeys.Genre]: '',
		[recommendFormKeys.Year]: '',
		[recommendFormKeys.Description]: '',
		[recommendFormKeys.Creator]: '',
		[recommendFormKeys.Image]: '',
	});

	const currentYear = new Date().getFullYear();
	const years = Array.from({length: currentYear - 1970 + 1}, (_, i) => currentYear - i);
	const {values, onChange, onSubmit, setValues} = useForm(submitHandler, initialValues);

	useEffect(() => {
		if (contentId) {
			contentService.getById(contentId)
				.then(foundContent => setValues({
					[recommendFormKeys.Type]: foundContent[recommendFormKeys.Type] || '',
					[recommendFormKeys.Title]: foundContent[recommendFormKeys.Title] || '',
					[recommendFormKeys.Genre]: foundContent[recommendFormKeys.Genre] || '',
					[recommendFormKeys.Year]: foundContent[recommendFormKeys.Year] || '',
					[recommendFormKeys.Description]: foundContent[recommendFormKeys.Description] || '',
					[recommendFormKeys.Creator]: foundContent[recommendFormKeys.Creator] || '',
					[recommendFormKeys.Image]: foundContent[recommendFormKeys.Image] || '',
				}))
				.catch(err => console.error(err))
		} else {
			setValues({
				[recommendFormKeys.Type]: '',
				[recommendFormKeys.Title]: '',
				[recommendFormKeys.Genre]: '',
				[recommendFormKeys.Year]: '',
				[recommendFormKeys.Description]: '',
				[recommendFormKeys.Creator]: '',
				[recommendFormKeys.Image]: '',
			})
		}

		setIsLoading(false)
	}, [contentId]);

	const validateInput = (e) => {
		if (!values[recommendFormKeys[e.target.name]] && e.target.value === ' ') {
			e.target.value = '';
		}
		onChange(e);
	}

	async function submitHandler() {

		if (!values[recommendFormKeys.Type]) return;

		const {inputIsValid, validatorMessages} = recommendValidator(values, {}, language)

		setRecommendAttempt(true);
		setValidator(validatorMessages)

		if (!inputIsValid) {
			return;
		}

		Object.keys(values).map(key => {
			values[key] = values[key].trim();
		})

		try {
			values.userId = _id;
			if (contentId) {
				await contentService.edit(values, contentId);
				navigate(`${Path.Details}/${contentId}`);
			} else {
				await contentService.create(values);
				navigate(Path.Home)
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		if (recommendAttempt) {
			const {validatorMessages} = recommendValidator(values, {}, language);
			setValidator(validatorMessages);
		}
	}, [language, values]);

	useEffect(() => {
		if (values[recommendFormKeys.Type] === 'movie') {
			setCreatorText({
				text: translateRecommend.director[language],
				placeholder: translateRecommend.directorPlaceholder[language],
			});
		} else if (values[recommendFormKeys.Type] === 'podcast') {
			setCreatorText({
				text: translateRecommend.host[language],
				placeholder: translateRecommend.hostPlaceholder[language],
			});
		} else if (values[recommendFormKeys.Type] === 'book') {
			setCreatorText({
				text: translateRecommend.author[language],
				placeholder: translateRecommend.authorPlaceholder[language],
			});
		}
	}, [values[recommendFormKeys.Type], language]);
	return (
		<section id='authentication'>
			{isLoading ? <div className="lds-dual-ring"></div> :
				<form onSubmit={onSubmit}>
					<fieldset>
						<legend>{contentId ? translateRecommend.edit[language] : translateRecommend.recommend[language]}</legend>


						<div className='input-container'>
							<label htmlFor={recommendFormKeys.Type}
								   className='auth-input'>{translateRecommend.type[language]}</label>
							<select
								id={recommendFormKeys.Type}
								className={recommendFormKeys.Type}
								name={recommendFormKeys.Type}
								onChange={onChange}
								value={values[recommendFormKeys.Type]}
							>
								<option value='' disabled hidden>{translateRecommend.selectType[language]}</option>
								<option value="book">{translateRecommend.book[language]}</option>
								<option value="movie">{translateRecommend.movie[language]}</option>
								<option value="podcast">{translateRecommend.podcast[language]}</option>
							</select>
						</div>

						{values[recommendFormKeys.Type] && (
							<>
								<div className='input-container'>
									<label htmlFor={recommendFormKeys.Title}
										   className='auth-input'>{translateRecommend.title[language]}</label>
									<input
										id={recommendFormKeys.Title}
										className={recommendFormKeys.Title}
										name={recommendFormKeys.Title}
										type="text"
										placeholder={translateRecommend.enterTitle[language]}
										onChange={validateInput}
										value={values[recommendFormKeys.Title]}
									/>
									{validator[recommendFormKeys.Title] &&
										<div className='authValidate'>
											<p>{validator[recommendFormKeys.Title]}</p>
										</div>}

								</div>
								<div className='input-container'>
									<label htmlFor={recommendFormKeys.Creator}
										   className='auth-input'>{creatorText.text}</label>
									<input
										id={recommendFormKeys.Creator}
										className={recommendFormKeys.Creator}
										name={recommendFormKeys.Creator}
										type="text"
										placeholder={creatorText.placeholder}
										onChange={validateInput}
										value={values[recommendFormKeys.Creator]}
									/>
									{validator[recommendFormKeys.Creator] &&
										<div className='authValidate'>
											<p>{validator[recommendFormKeys.Creator]}</p>
										</div>}

								</div>
								<div className='input-container'>
									<label htmlFor={recommendFormKeys.Genre}
										   className='auth-input'>{translateRecommend.genre[language]}</label>
									<select
										id={recommendFormKeys.Genre}
										className={recommendFormKeys.Genre}
										name={recommendFormKeys.Genre}
										value={values[recommendFormKeys.Genre]}
										onChange={onChange}
									>
										{translateGenreOptions[values[recommendFormKeys.Type]][language].map((genre) => (
											<option key={genre.value} value={genre.value}>
												{genre.label}
											</option>
										))}
									</select>
									{validator[recommendFormKeys.Genre] &&
										<div className='authValidate'>
											<p>{validator[recommendFormKeys.Genre]}</p>
										</div>}
								</div>
								<div className='input-container'>
									<label htmlFor={recommendFormKeys.Year}
										   className='auth-input'>{translateRecommend.year[language]}</label>
									<select
										id={recommendFormKeys.Year}
										className={recommendFormKeys.Year}
										name={recommendFormKeys.Year}
										value={values[recommendFormKeys.Year]}
										onChange={onChange}
									>
										<option value=''>
											{translateRecommend.selectYear[language]}
										</option>
										{years.map(year => (
											<option key={year} value={year}>
												{year}
											</option>
										))}
									</select>
									{validator[recommendFormKeys.Year] &&
										<div className='authValidate'>
											<p>{validator[recommendFormKeys.Year]}</p>
										</div>}
								</div>
								<div className='input-container'>
									<label htmlFor={recommendFormKeys.Image}
										   className='auth-input'>{translateRecommend.image[language]}</label>
									<input
										id={recommendFormKeys.Image}
										className={recommendFormKeys.Image}
										name={recommendFormKeys.Image}
										type="text"
										placeholder={translateRecommend.imagePlaceholder[language]}
										onChange={validateInput}
										value={values[recommendFormKeys.Image]}
									/>
									{validator[recommendFormKeys.Image] &&
										<div className='authValidate'>
											<p>{validator[recommendFormKeys.Image]}</p>
										</div>}

								</div>

								<div className='input-container'>
									<label htmlFor={recommendFormKeys.Description} className='auth-input'>
										{translateRecommend.description[language]}
									</label>
									<textarea
										id={recommendFormKeys.Description}
										className={recommendFormKeys.Description}
										name={recommendFormKeys.Description}
										placeholder={translateRecommend.placeholderDescription[language]}
										onChange={validateInput}
										value={values[recommendFormKeys.Description]}
									>
								</textarea>
									{validator[recommendFormKeys.Description] &&
										<div className='authValidate'>
											<p>{validator[recommendFormKeys.Description]}</p>
										</div>}
								</div>
							</>
						)}


						<button type="submit"
								className='auth-button'>{contentId ? translateRecommend.edit[language] : translateRecommend.recommend[language]}</button>

					</fieldset>
				</form>}
		</section>
	)
		;
}
