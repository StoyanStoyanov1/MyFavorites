import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {

	const [language, setLanguage] = useState(() => {
		return Cookies.get('language') || 'en';
	});

	const updateLanguage = (newLanguage) => {
		setLanguage(newLanguage);
		Cookies.set('language', newLanguage, { expires: 365 });
	};

	return (
		<LanguageContext.Provider value={[language, updateLanguage]}>
			{children}
		</LanguageContext.Provider>
	)
}

export function useLanguage() {
	return useContext(LanguageContext);
}
