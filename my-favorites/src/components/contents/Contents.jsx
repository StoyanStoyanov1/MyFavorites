import React from 'react';
import ContentDetails from "./ContentDetails.jsx";
import {useLanguage} from "../../context/LanguageContext.jsx";
import {recommendFormKeys} from "../../utils/formKeys/recommendFormKeys.js";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js";
import translateRecommend from "../../utils/translator/translateRecommend.js";

export default function Contents() {
	const items = Array.from({ length: 40 }); // Създава масив с 40 елемента
	const [language] = useLanguage();

	return (
		<div id='content-body'>
			<div className='search'>
				<div className='search-input'>
					<label htmlFor={recommendFormKeys.Title} className='search-label'></label>
					<input
						id={recommendFormKeys.Title}
						className='search-field'
						name={recommendFormKeys.Title}
						type="text"
						placeholder={translateRecommend.title[language]}
					/>
				</div>
				<div className='search-container'>
					<label htmlFor={recommendFormKeys.Genre} className='search-label'></label>
					<select
						id={recommendFormKeys.Genre}
						className='search-field'
						name={recommendFormKeys.Genre}
					>
						{translateGenreOptions.movie[language].map((genre) => (
							<option key={genre.value} value={genre.value}>
								{genre.label}
							</option>
						))}
					</select>
				</div>
				<button type="submit" className='search-button'>Search</button>
			</div>
			<div className='contents-body'>
				{items.map((_, index) => (
					<ContentDetails key={index}/>
				))}
			</div>
		</div>
	);
}
