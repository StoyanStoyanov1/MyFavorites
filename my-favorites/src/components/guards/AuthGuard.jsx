import React from 'react';
import {useContext} from "react";
import authContext from "../../context/authContext.jsx";
import {Navigate, Outlet} from "react-router-dom";
import Path from "../../paths.js";
import translateAuthMessages from "../../utils/translator/translateAuthMessages.js";
import {useLanguage} from "../../context/LanguageContext.jsx";

export default function AuthGuard() {
	const [language] = useLanguage();
	const {isAuthenticated} = useContext(authContext);

	if (!isAuthenticated) {
		alert(translateAuthMessages.needLogin[language])
		return <Navigate to={Path.Login}/>
	}

	return <Outlet/>
}