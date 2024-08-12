import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';
import MockLanguageProvider from "../../test/MochLanguageProvider.jsx";

describe('Register Component', () => {
	test('renders the input fields and checks the link to login', () => {
		render(
			<BrowserRouter>
				<MockLanguageProvider>
					<Register />
				</MockLanguageProvider>
			</BrowserRouter>
		);

		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Password')).toBeInTheDocument();
		expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
		expect(screen.getByLabelText('Username')).toBeInTheDocument();

		const registerLink = screen.getByRole('link', { name: /here/i });
		expect(registerLink).toBeInTheDocument();
		expect(registerLink).toHaveAttribute('href', '/login');
	});
});
