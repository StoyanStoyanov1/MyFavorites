import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as contentService from '../../services/contentService.js';
import * as userService from '../../services/userService.js';
import translateRecommend from '../../utils/translator/translateRecommend.js';
import {useLanguage} from '../../context/LanguageContext.jsx';
import translateGenre from "./translateGenre.js";
import Path from "../../paths.js";
import translateContents from "../../utils/translator/translateContents/translateContents.js";
import authContext from "../../context/authContext.jsx";
import translateMessages from "../../utils/translator/translateMessages/translateMessages.js";

export default function ContentInfo() {
	const navigate = useNavigate();
	const {_id} = useContext(authContext);
	const [language] = useLanguage();
	const {detailId} = useParams();
	const [content, setContent] = useState(null);
	const [user, setUser] = useState(null);
	const [creatorText, setCreatorText] = useState('');
	const [isLiked, setIsLiked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [favoriteMessage, setFavoriteMessage] = useState({})

	useEffect(() => {
		contentService.getById(detailId)
			.then(foundContent => {
				setContent(foundContent);
				setFavoriteMessage(translateMessages(foundContent));
			})
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
			} else if (content.type === 'book' || content.type === 'series') {
				setCreatorText(translateRecommend.author[language]);
			}
		}
	}, [content, language]);

	useEffect(() => {
		if (content && _id) {
			userService.getById(_id)
				.then(foundUser => {
					setUser(foundUser);
					setIsLiked(foundUser.favorites.includes(content._id));
				})
				.catch(err => {
					console.error(err.message);
				})
		}
	}, [_id, content]);

	const handleDelete = async () => {
		try {
			await contentService.remove(content._id);
			console.log('Delete successful');
			navigate(Path.Home);
		} catch (err) {
			alert(err.message);
			navigate(Path.Home);
		}

	}

	const handleLike = async () => {
		setTimeout(() => {
			setIsDisabled(false);
		}, 2000);

		setIsDisabled(true);

		if (_id) {
			if (isLiked) {
				userService.removeFavorite(content._id, _id);
				user.favorites = user.favorites.filter(contentId => contentId !== content._id);
			} else {
				userService.addFavorite(content._id, _id);
				user.favorites.push(content._id);
			}

			setIsLiked(user.favorites.includes(content._id));
		}
	}

	return (
		content ? (
			<div className='container-content'>
				{isDisabled && <div className='message-box'>
					<p>{!_id ? favoriteMessage.logged[language] : isLiked ? favoriteMessage.addFavorite[language] : favoriteMessage.removeFavorite[language]}</p>
				</div>}
				<div className='left-site'>
					<img
						src={content.image}
						alt='Image'
						onError={(e) => e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK98VBjmf1Q6_3SC9Nmz8CILkBdm1BUiFLg&s'}
					/>
					<div
						className={`heart ${isLiked ? 'is-liked' : 'not-liked'}`}
						onClick={!isDisabled ? handleLike : null}
					>
					</div>

					{_id === content.userId && <div className='buttons'>
						<button onClick={() => navigate(`${Path.EditRecommend}/${detailId}`)}>Edit</button>
						<button onClick={handleDelete}>Delete</button>
					</div>}

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
			<section id='authentication'>
				<div className="lds-dual-ring"></div>
			</section>)
	);
}
