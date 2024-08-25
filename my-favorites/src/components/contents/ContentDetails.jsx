import React, {useEffect, useState} from 'react';
import translateRecommend from "../../utils/translator/translateRecommend.js";
import { recommendFormKeys } from "../../utils/formKeys/recommendFormKeys.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import {useNavigate} from "react-router-dom";
import Path from "../../paths.js";
import translateGenre from "./translateGenre.js";

export default function ContentDetails({
	_id,
	title,
	genre,
	year,
	image,
	creator,
	type,
									   }) {
	const [language] = useLanguage();
	const navigate = useNavigate()



	const [creatorText, setCreatorText] = useState({});

	const handleClick = (e) => {
		e.preventDefault();
		navigate(`${Path.Details}/${_id}`)
	}

	useEffect(() => {
		if (type === 'movie' || type === 'series') {
			setCreatorText({
				text: translateRecommend.director[language],
				placeholder: translateRecommend.directorPlaceholder[language],
			});
		} else if (type === 'podcast') {
			setCreatorText({
				text: translateRecommend.host[language],
				placeholder: translateRecommend.hostPlaceholder[language],
			});
		} else if (type === 'book') {
			setCreatorText({
				text: translateRecommend.author[language],
				placeholder: translateRecommend.authorPlaceholder[language],
			});
		}
	}, [type, language]);
	return (
		<section className='section-content' onClick={handleClick}>
			<div className='upercase'>
				<img
					src={image}
					alt='No Image'
					onError={(e) => e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK98VBjmf1Q6_3SC9Nmz8CILkBdm1BUiFLg&s'}
				/>
			</div>
			<div className='infocase'>
				<div className='content-title'>
					<p>{translateRecommend[recommendFormKeys.Title][language]}: {title}</p>
				</div>
				<p>{creatorText.text}: {translateGenre(creator)}</p>
				<p>{translateRecommend[recommendFormKeys.Genre][language]}: {translateGenre(genre, language)}</p>
				<p>{translateRecommend[recommendFormKeys.Year][language]}: {year}</p>

			</div>
		</section>
	);
}
