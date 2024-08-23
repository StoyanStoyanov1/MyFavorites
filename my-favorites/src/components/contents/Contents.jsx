import React, {useContext, useEffect, useState} from 'react';
import ContentDetails from "./ContentDetails.jsx";
import {useLanguage} from "../../context/LanguageContext.jsx";
import {recommendFormKeys} from "../../utils/formKeys/recommendFormKeys.js";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js";
import {useLocation, useParams} from "react-router-dom";
import * as contentService from "../../services/contentService.js";
import translateContents from "../../utils/translator/translateContents/translateContents.js";
import translateHeader from "../../utils/translator/translateHeader.js";
import useForm from "../../hooks/useForm.js";

export default function Contents() {
	const {userId} = useParams();
	const [language] = useLanguage();
	const location = useLocation();
	let path = location.pathname.split('/')[1];

	const [items, setItems] = useState([]);
	const {values, onChange, onSubmit} = useForm(submitHandler, {
		type: '',
		title: '',
		genre: '',
	});

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		contentService.getAll(`${path}/${userId ? userId: ''}`)
			.then(result => {
				console.log(result)
				setItems(result);
				setIsLoading(false);
			})

			.catch(err => {
				console.error(err.message);
			});
	}, [path]);

	async function submitHandler(event) {
		setIsLoading(true);
		try {
			const searchResult = await contentService.getSearchResult(values.title, values.genre, path);
			setItems(searchResult);
		} catch (error) {
			let message;
			alert(message ? message : error.message);
		} finally {
			setIsLoading(false);
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
