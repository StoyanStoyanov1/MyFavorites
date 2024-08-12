import React, {useState} from 'react';
import Path from './../../utils/paths.js'
import {Link} from "react-router-dom";
import languageHeader from "../../utils/languages/languageHeader.js";
import {useLanguage} from "../../context/LanguageContext.jsx";

export default function Header() {
	const [language, setLanguage] = useLanguage();


	const handleLanguageChange = (e) => {
		setLanguage(e.target.value);
	};
	return (
		<header>

			<nav>

				<div className="nav-left">


					<Link to={Path.Home}>{languageHeader.books[language]}</Link>
					<Link to={Path.Home}>{languageHeader.movies[language]}</Link>
					<Link to={Path.Home}>{languageHeader.podcasts[language]}</Link>
				</div>
				<div className="favorites-container">
					<Link className="favorites-text" to={Path.Home}>My Favorites</Link>
				</div>
				<div className="nav-right">

					<Link to={Path.Login}>{languageHeader.login[language]}</Link>
					<Link to={Path.Register}>{languageHeader.register[language]}</Link>
					<Link to={Path.Home}>{languageHeader.logout[language]}</Link>
					<div className="language-selector">
						<select value={language} onChange={handleLanguageChange}>
							<option value="en">English</option>
							<option value="de">Deutsch</option>
							<option value="bg">Български</option>
						</select>
					</div>
				</div>
			</nav>

		</header>
	)
}