import React, {useContext, useEffect, useState} from "react";
import {recommendFormKeys} from "../../utils/formKeys/recommendFormKeys.js";
import translateRecommend from "../../utils/translator/translateRecommend.js";
import {useLanguage} from "../../context/LanguageContext.jsx";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js"
import useForm from "../../hooks/useForm.js";
import {authFormKeys} from "../../utils/formKeys/authFormKeys.js";

export default function Recommend() {
	const [language] = useLanguage()

	const [genre, setGenre] = useState('');
	const [year, setYear] = useState('');
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);
	const {values, onChange, onSubmit} = useForm(() => {}, {
		[recommendFormKeys.Type]: '',
		[recommendFormKeys.Title]: '',
		[recommendFormKeys.Genre]: '',
		[recommendFormKeys.Year]: '',
		[recommendFormKeys.Description]: '',
	});

	const validateInput = (e) => {

		if (!values[recommendFormKeys.Title] && !e.target.value.trim()) {
			return;
		}


		onChange(e);
	}
	return (
		<section id='authentication'>
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>{translateRecommend.recommend[language]}</legend>

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
									placeholder={translateRecommend.title[language]}
									onChange={validateInput}
									value={values[recommendFormKeys.Title]}
								/>

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
								onChange={onChange}
								value={values[recommendFormKeys.Description]}
								>

								</textarea>
							</div>
						</>
					)}


					<button type="submit" className='auth-button'>{translateRecommend.recommend[language]}</button>

				</fieldset>
			</form>
		</section>
	)
		;
}
