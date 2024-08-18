import React, {useContext, useEffect, useState} from "react";
import {recommendFormKeys} from "../../utils/formKeys/recommendFormKeys.js";
import translateRecommend from "../../utils/translator/translateRecommend.js";
import {useLanguage} from "../../context/LanguageContext.jsx";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js"

export default function Recommend() {
	const [language] = useLanguage()

	const [typeRecommend, setTypeRecommend] = useState('');
	const [genre, setGenre] = useState('');
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);

	const changeTypeRecommend = (e) => {
		setTypeRecommend(e.target.value);
		setGenre('')
	};
	return (
		<section id='authentication'>
			<form>
				<fieldset>
					<legend>{translateRecommend.recommend[language]}</legend>

					<div className='input-container'>
						<label htmlFor={recommendFormKeys.Type}
							   className='auth-input'>{translateRecommend.type[language]}</label>
						<select
							id={recommendFormKeys.Type}
							className={recommendFormKeys.Type}
							name={recommendFormKeys.Type}
							onChange={changeTypeRecommend}
							value={typeRecommend}
						>
							<option value='' disabled hidden>{translateRecommend.selectType[language]}</option>
							<option value="book">{translateRecommend.book[language]}</option>
							<option value="movie">{translateRecommend.movie[language]}</option>
							<option value="podcast">{translateRecommend.podcast[language]}</option>
						</select>
					</div>

					{typeRecommend && (
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
								/>

							</div>
							<div className='input-container'>
								<label htmlFor={recommendFormKeys.Genre}
									   className='auth-input'>{translateRecommend.genre[language]}</label>
								<select
									id={recommendFormKeys.Genre}
									className={recommendFormKeys.Genre}
									name={recommendFormKeys.Genre}
								>
									{translateGenreOptions[typeRecommend][language].map((genre) => (
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
								>
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
