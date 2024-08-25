import React, {useContext, useEffect, useState} from 'react';
import ContentDetails from "./ContentDetails.jsx";
import {useLanguage} from "../../context/LanguageContext.jsx";
import {recommendFormKeys} from "../../utils/formKeys/recommendFormKeys.js";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import * as contentService from "../../services/contentService.js";
import translateContents from "../../utils/translator/translateContents/translateContents.js";
import translateHeader from "../../utils/translator/translateHeader.js";
import useForm from "../../hooks/useForm.js";
import translateRecommend from "../../utils/translator/translateRecommend.js";
import authContext from "../../context/authContext.jsx";

export default function Contents() {
	const navigate = useNavigate();

	const {_id} = useContext(authContext);
	const {userId} = useParams();
	const [language] = useLanguage();
	const location = useLocation();
	let path = location.pathname.split('/')[1];

	const currentType = userId ? '' : path.slice(0, -1);
	const initialValues = {
		type: !userId ? currentType : '',
		title: '',
		genre: '',
	};

	const [items, setItems] = useState([]);
	const {values, onChange, onSubmit, setValues} = useForm(searchHandler, initialValues);
	const [foundItems, setFoundItems] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setValues(initialValues);
		contentService.getAll(`${path}/${userId ? userId : ''}`)
			.then(result => {
				setFoundItems(result);
				setItems(result);
				setIsLoading(false);
			})
			.catch(err => {
				console.error(err.message);
				if (err.message === 'Invalid User ID format') {
					navigate('*');
				}
			});

	}, [path, userId]);

	async function searchHandler() {

		if (!userId) {
			setIsLoading(true);

			try {
				const searchResult = await contentService.getSearchResult(values.title, values.genre, values.type);
				setItems(searchResult);
			} catch (error) {
				alert(error.message);
			} finally {
				setIsLoading(false);
			}
		} else {

			const resultSearch = foundItems.filter(item =>
				(!values.type || item.type.includes(values.type)) &&
				(!values.genre || item.genre.includes(values.genre)) &&
				(!values.title || item.title.includes(values.title))
			);

			setItems(resultSearch)

		}
	}

	return (
		<div id='content-body'>
			<h1 className='content-header'>{translateHeader[path][language]}</h1>
			<form className='search' onSubmit={onSubmit}>
				<div className='search-input'>
					<label htmlFor={recommendFormKeys.Title} className='search-label'></label>
					<input
						id={recommendFormKeys.Title}
						className='search-field'
						name={recommendFormKeys.Title}
						type="text"
						placeholder={translateContents.searchTitle[language]}
						onChange={onChange}
						value={values.title}
					/>
				</div>
				<div className='search-container'>
					<label htmlFor={recommendFormKeys.Genre} className='search-label'></label>
					<select
						id={recommendFormKeys.Genre}
						className='search-field'
						name={recommendFormKeys.Genre}
						onChange={onChange}
						value={values.genre}
					>
						{translateGenreOptions.movie[language].map((genre) => (
							<option key={genre.value} value={genre.value}>
								{genre.label}
							</option>
						))}
					</select>
				</div>
				{userId ? <div className='search-container'>

					<select
						id={recommendFormKeys.Type}
						className={recommendFormKeys.Type}
						name={recommendFormKeys.Type}
						onChange={onChange}
						value={values[recommendFormKeys.Type]}
					>
						<option value=''>{translateRecommend.selectType[language]}</option>
						<option value="book">{translateRecommend.book[language]}</option>
						<option value="movie">{translateRecommend.movie[language]}</option>
						<option value="podcast">{translateRecommend.podcast[language]}</option>
					</select>
				</div> : ''}

				<button type="submit" className='search-button'>{translateContents.searchButton[language]}</button>
			</form>
			<div className='contents-body'>
				{isLoading ? <div className="lds-dual-ring"></div>
					: !items.length ? <div className='not-found-message'>
							<p>{translateContents.notFound[language]}</p></div> :

						items.map((content) => (
							<ContentDetails key={content._id} {...content} />
						))
				}
			</div>

		</div>
	);
}
