import {LanguageProvider} from "../context/LanguageContext.jsx";
import React from "react";

const MockLanguageProvider = ({ children }) => {
	const mockLanguage = 'en';
	const mockSetLanguage = jest.fn();
	return (
		<LanguageProvider value={[mockLanguage, mockSetLanguage]}>
			{children}
		</LanguageProvider>
	);
};

export default MockLanguageProvider;