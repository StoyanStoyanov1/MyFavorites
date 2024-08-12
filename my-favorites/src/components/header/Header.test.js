import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './Header.jsx';
import Path from '../../../utils/paths.js';

describe('Header Component', () => {
	test('Navigates to Login and Register correctly', () => {
		render(
			<Router>
				<Header/>
			</Router>
		);

		const loginLink = screen.getByText('Login');
		const registerLink = screen.getByText('Register');

		expect(loginLink.closest('a')).toHaveAttribute('href', Path.Login);
		expect(registerLink.closest('a')).toHaveAttribute('href', Path.Register);
	});
});
