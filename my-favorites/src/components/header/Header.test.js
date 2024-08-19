import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './Header.jsx';
import Path from '../../paths.js';
import MochLanguageProvider from "../../test/MochLanguageProvider.jsx";

describe('Header Component', () => {
	test('Navigates to Login and Register correctly', () => {
		render(
			<Router>
				<MochLanguageProvider>
					<Header/>
				</MochLanguageProvider>
			</Router>
		);

		const loginLink = screen.getByText('Login');
		const registerLink = screen.getByText('Register');

		expect(loginLink.closest('a')).toHaveAttribute('href', Path.Login);
		expect(registerLink.closest('a')).toHaveAttribute('href', Path.Register);
	});
});
