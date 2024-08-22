import React from 'react'
import translateHome from "../../utils/translator/translateHome/translateHome.js";
import {useLanguage} from "../../context/LanguageContext.jsx";

export default function Home() {
	const [language] = useLanguage();
	return(
		<div className='home-container'>
			<h1>{translateHome.welcome[language]}</h1>
			<p>{translateHome.info[language]}</p>
			<span>{translateHome.share[language]}</span>
		</div>
	)
}