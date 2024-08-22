import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as contentService from '../../services/contentService.js';
import translateRecommend from '../../utils/translator/translateRecommend.js';
import {useLanguage} from '../../context/LanguageContext.jsx';
import translateGenre from "./translateGenre.js";
import Path from "../../paths.js"
import translateContents from "../../utils/translator/translateContents/translateContents.js";

export default function ContentInfo() {
	const navigate = useNavigate();

	const [language] = useLanguage();
	const {detailId} = useParams();
	const [content, setContent] = useState(null);
	const [creatorText, setCreatorText] = useState('')


	useEffect(() => {
		contentService.getById(detailId)
			.then(result => setContent(result))
			.catch(err => {
				console.error(err.message.message);
				navigate(Path.Home);
				alert(translateContents.notFoundMessage[language])
			});
	}, [detailId]);

	useEffect(() => {

		if (content) {
			if (content.type === 'movie') {
				setCreatorText(translateRecommend.director[language]);
			} else if (content.type === 'podcast') {
				setCreatorText(translateRecommend.host[language])
			} else if (content.type === 'book') {
				setCreatorText(translateRecommend.author[language]);
			}
		}
	}, [content, language]);

	return (
		content ? (
			<div className='container-content'>
				<div className='left-site'>
					<img
						src={content.image}
						alt='Image'
						onError={(e) => e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK98VBjmf1Q6_3SC9Nmz8CILkBdm1BUiFLg&s'}
					/>
					<p className='likes'>Likes: </p>
					<p className='favorite'>Favorite</p>

					<div className='buttons'>
						<button>Edit</button>
						<button>Delete</button>
					</div>
				</div>

				<div className='divider'></div>

				<div className='right-site'>
					<h1>{translateRecommend[content.type][language]}</h1>
					<p>{translateRecommend.title[language]}: {content.title}</p>
					<p>{creatorText}: {content.creator}</p>
					<p>{translateRecommend.genre[language]}: {translateGenre(content.genre, language)}</p>
					<p>{translateRecommend.year[language]}: {content.year}</p>
					<p>Rating: Rating</p>
					<span>{translateRecommend.description[language]}:</span>
					<div className='content-description'>
						<p>
							{content.description}
						</p>
					</div>
				</div>
			</div>
		) : (
			<p>Loading...</p>
		)
	);
}
