import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import MochLanguageProvider from "../../test/MochLanguageProvider.jsx";

describe.only('Login Component', () => {
	test('renders the input fields and checks the link to Register', () => {
		render(
			<BrowserRouter>
				<MochLanguageProvider>
					<Login />
				</MochLanguageProvider>
			</BrowserRouter>
		);

		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Password')).toBeInTheDocument();
		expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();


		const registerLink = screen.getByRole('link', { name: /here/i });
		expect(registerLink).toBeInTheDocument();
		expect(registerLink).toHaveAttribute('href', '/register');

	});
});
