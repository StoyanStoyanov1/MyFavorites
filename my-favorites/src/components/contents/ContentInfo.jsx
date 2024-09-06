import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import * as contentService from '../../services/contentService.js';
import * as userService from '../../services/userService.js';
import * as commentService from '../../services/commentService.js';

import translateRecommend from '../../utils/translator/translateRecommend.js';
import {useLanguage} from '../../context/LanguageContext.jsx';
import translateGenre from "./translateGenre.js";
import Path from "../../paths.js";
import translateContents from "../../utils/translator/translateContents/translateContents.js";
import authContext from "../../context/authContext.jsx";
import translateMessages from "../../utils/translator/translateMessages/translateMessages.js";
import Vote from "./Vote.jsx";
import countries from "../../utils/countries.js";
import { FaPaperPlane } from 'react-icons/fa';

export default function ContentInfo() {
	const maxLengthDescription = 300;
	
	const navigate = useNavigate();
	const {_id, isAuthenticated} = useContext(authContext);
	const [language] = useLanguage();
	const {contentId} = useParams();
	const [content, setContent] = useState(null);
	const [user, setUser] = useState(null);
	const [creatorText, setCreatorText] = useState('');
	const [isLiked, setIsLiked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [favoriteMessage, setFavoriteMessage] = useState({});
	const [descriptionText, setDescriptionText] = useState('');
	const [lengthDesciption, setLengthDescription] = useState(maxLengthDescription);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState(false);

	useEffect(() => {
		setLengthDescription(maxLengthDescription - descriptionText.trimStart().length);
	}, [descriptionText])


	useEffect(() => {
		contentService.getById(contentId)
			.then(foundContent => {
				setContent(foundContent);
				setFavoriteMessage(translateMessages(foundContent));
			})
			.catch(err => {
				console.error(err.message.message);
				navigate(Path.Home);
				alert(translateContents.notFoundMessage[language]);
			});
	}, [contentId]);

	useEffect(() => {
		if (content) {
			if (content.type === 'movie') {
				setCreatorText(translateRecommend.director[language]);
			} else if (content.type === 'podcast') {
				setCreatorText(translateRecommend.host[language]);
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
				});
		}
	}, [_id, content]);

	const handleDelete = async () => {
		try {
			await contentService.remove(content._id);
			navigate(Path.Home);
		} catch (err) {
			alert(err.message);
			navigate(Path.Home);
		}
	};

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
	};

	const sendComment = () => {
		if (lengthDesciption < 0) {
			return alert(translateContents.longComment[language]);
		}

		setNewComment(true);
		if (!descriptionText.length) return;

		const data = {
			contentId,
			userId: _id,
			text: descriptionText
		}

		commentService.create(contentId, data);

		setDescriptionText('');
	}

	useEffect(() => {
		async function foundComments() {
			setNewComment(false);

			try {
				const comments = await commentService.getByContentId(contentId);
	
				const updatedComments = await Promise.all(
					comments.map(async comment => {
						const user = await userService.getById(comment.userId);
						return {
							...comment,
							username: user.username,
						};
					})
				
				);

				updatedComments.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
	
				setComments(updatedComments);
			} catch (err) {
				console.error("Error fetching comments or users: ", err.message);
			}
		}
	
		foundComments();
	}, [contentId, newComment]);
	
	
	
	return (
		content ? (
			<div className='infopage'>
				<h1 className='type-header'>{translateRecommend[content.type][language]}</h1>
				<div className='container-content'>
					{isDisabled && (
						<div className='message-box'>
							<p>
								{!_id
									? favoriteMessage.logged[language]
									: isLiked
										? favoriteMessage.addFavorite[language]
										: favoriteMessage.removeFavorite[language]}
							</p>
						</div>
					)}
					<div className='content-header'>
						<h1>{content.title}</h1>

						<img
							src={content.image}
							alt='Image'
							onError={(e) => (e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkK98VBjmf1Q6_3SC9Nmz8CILkBdm1BUiFLg&s')}
						/>
						<Vote voteId={content.voters} userId={_id}/>
						<div
							className={`heart ${isLiked ? 'is-liked' : 'not-liked'}`}
							onClick={!isDisabled ? handleLike : null}
						></div>


					</div>

					<div className='divider'></div>

					<div className='content-body'>
						<p>{creatorText}: {content.creator}</p>
						<p>{translateRecommend.genre[language]}: {content.genre.map(genre => translateGenre(genre.value, language)).join(', ')}</p>
						<p>{translateRecommend.country[language]}: {countries[content.country][language]}</p>
						<p>{translateRecommend.year[language]}: {content.year}</p>
						<p>{translateRecommend.description[language]}: {content.description}</p>

					</div>
						
					<div className='comments-container'>
						<h2>{translateContents.comments[language]} ({comments.length})</h2>

						{comments.map((comment, index) => (
							<div key={index} className='comment-body'>
								<div className='comment-header'>
									<h3 className='comment-username'>{comment.username}</h3>
									<span className='comment-date'>{new Date(comment.updatedAt).toLocaleString()}</span>
								</div>
								<p className='comment-text'>{comment.text}</p>
							</div>
						))}

					</div>
						{isAuthenticated && 					<><div className='comment-form'>
                                <textarea
									placeholder={translateContents.writeComment[language]}
									onChange={(e) => setDescriptionText(e.target.value)}
									value={descriptionText.trimStart()}
								/>
						<FaPaperPlane
							onClick={sendComment}
							className='send-icon'
						/>
					</div>
					<p className={lengthDesciption < 0 ? 'negative-counter': 'positive-counter'}>{translateContents.textCounterMesage[language]} ({lengthDesciption})</p></>} 


					{_id === content.userId && (
						<div className='buttons'>
							<button onClick={() => navigate(`${Path.EditRecommend}/${contentId}`)}>Edit</button>
							<button onClick={handleDelete}>Delete</button>
						</div>
					)}

				</div>

			</div>
			
		) : (
			<section id='authentication'>
				<div className="lds-dual-ring"></div>
			</section>)

	);
}
