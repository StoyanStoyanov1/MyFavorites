import React from 'react';
import noImage from '../../../public/images/noImage.jpg';
import translateRecommend from "../../utils/translator/translateRecommend.js";
import { recommendFormKeys } from "../../utils/formKeys/recommendFormKeys.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js";

export default function ContentDetails({
	title,
	genre,
	year
									   }) {
	const [language] = useLanguage();

	const translateGenre = (genre) => {
		const genreOptions = translateGenreOptions.movie[language];
		if (genreOptions) {
			const genreOption = genreOptions.find(option => option.value === genre);
			return genreOption ? genreOption.label : genre;
		}
		return genre;
	}

	return (
		<section className='section-content'>
			<div className='upercase'>
				<div className='content-photo'>
					<img
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&s'
						alt='No Image'
					/>
				</div>
			</div>
			<div className='infocase'>
				<div className='content-title'>
					<p>{translateRecommend[recommendFormKeys.Title][language]}: {title}</p>
				</div>
				<p>{translateRecommend[recommendFormKeys.Genre][language]}: {translateGenre(genre)}</p>
				<p>{translateRecommend[recommendFormKeys.Year][language]}: {year}</p>
				<p>Other2</p>
				<p>Other3</p>
			</div>
		</section>
	);
}
