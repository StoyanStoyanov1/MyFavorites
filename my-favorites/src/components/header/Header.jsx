import React, {useContext, useState} from 'react';
import Path from '../../paths.js'
import {Link} from "react-router-dom";
import translateHeader from "../../utils/translator/translateHeader.js";
import {useLanguage} from "../../context/LanguageContext.jsx";
import authContext from "../../context/authContext.jsx";

export default function Header() {
	const [language, setLanguage] = useLanguage();
	const {_id, username, isAuthenticated} = useContext(authContext);

	const handleLanguageChange = (e) => {
		setLanguage(e.target.value);
	};

	return (
		<header>

			<nav>

				<div className="nav-left">


					<Link to={Path.Books}>{translateHeader.books[language]}</Link>
					<Link to={Path.Movies}>{translateHeader.movies[language]}</Link>
					<Link to={Path.Podcasts}>{translateHeader.podcasts[language]}</Link>
				</div>
				<div className="favorites-container">
					<Link className="favorites-text" to={Path.Home}>My Favorites</Link>
				</div>
				<div className="nav-right">

					{isAuthenticated && <>
							<div className='profilMenu'>
								<button className="profilMenu-button">{username}</button>
								<div className="profilMenu-content">
									<Link to={`${Path.MyRecommends}/${_id}`}>{translateHeader.myRecommendations[language]}</Link>
									<Link to={Path.Recommend}>{translateHeader.recommend[language]}</Link>
									<Link to={`${Path.MyFavorites}/${_id}`}>{translateHeader.favorites[language]}</Link>
									<Link to={Path.Logout}>{translateHeader.logout[language]}</Link>
								</div>
							</div>
							</>
						||
						<>
							<Link to={Path.Login}>{translateHeader.login[language]}</Link>
							<Link to={Path.Register}>{translateHeader.register[language]}</Link>
						</>}


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