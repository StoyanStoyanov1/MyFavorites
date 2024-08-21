import React, { useEffect, useState } from 'react';
import ContentDetails from "./ContentDetails.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { recommendFormKeys } from "../../utils/formKeys/recommendFormKeys.js";
import translateGenreOptions from "../../utils/translator/translateGenreOptions.js";
import { useLocation } from "react-router-dom";
import * as contentService from "../../services/contentService.js";
import translateContents from "../../utils/translator/translateContents/translateContents.js";
import translateHeader from "../../utils/translator/translateHeader.js";
import useForm from "../../hooks/useForm.js";

export default function Contents() {
	const [language] = useLanguage();
	const location = useLocation();
	const path = location.pathname.split('/')[1];

	const [items, setItems] = useState([]);
	const { values, onChange, onSubmit } = useForm(submitHandler, {
		title: '',
		genre: '',
	});

	useEffect(() => {
		contentService.getAll(path)
			.then(result => {
				setItems(result);
			})
			.catch(err => {
				console.error(err);
			});
	}, [path]);

	async function submitHandler(event) {

		try {
			const searchResult = await contentService.getSearchResult(values.title, values.genre, path);
			setItems(searchResult);
		} catch (error) {
			let message;
			alert(message ? message : error.message);
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
				{items.map((content) => (
					<ContentDetails key={content._id} {...content} />
				))}
			</div>
		</div>
	);
}
