import React, {useContext, useEffect, useState} from 'react';
import translateRecommend from "../../utils/translator/translateRecommend.js";
import { recommendFormKeys } from "../../utils/formKeys/recommendFormKeys.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import {useNavigate} from "react-router-dom";
import Path from "../../paths.js";
import translateGenre from "./translateGenre.js";
import Vote from "./Vote.jsx";
import authContext from "../../context/authContext.jsx";
import countries from "../../utils/countries.js";

export default function ContentDetails({
	_id,
	title,
	genre,
	year,
	image,
	creator,
	type,
	voters,
	country,
									   }) {
	const [language] = useLanguage();
	const navigate = useNavigate()
	const authContextValue = useContext(authContext);
	const userId = authContextValue._id;

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
			<div className='content-title'>
				<p>{title}</p>
			</div>
			<div className='upercase'>
				<img
					src={image}
					alt='No Image'
					onError={(e) => e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK98VBjmf1Q6_3SC9Nmz8CILkBdm1BUiFLg&s'}
				/>
			</div>
			<div className='infocase'>

				<p>{creatorText.text}: {translateGenre(creator)}</p>
				<p>{translateRecommend[recommendFormKeys.Country][language]}: {countries[country][language]}</p>
				<p>{translateRecommend[recommendFormKeys.Genre][language]}: {genre.map(g => translateGenre(g.value, language)).join(', ')}</p>
				<p>{translateRecommend[recommendFormKeys.Year][language]}: {year}</p>

			</div>

			<Vote voteId={voters} userId={userId}/>
		</section>
	);
}
