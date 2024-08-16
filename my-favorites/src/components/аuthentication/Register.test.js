import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

	test('renders gender radio buttons and selects one', () => {
		render(
			<BrowserRouter>
				<MockLanguageProvider>
					<Register />
				</MockLanguageProvider>
			</BrowserRouter>
		);

		// Query all radio buttons
		const genderRadios = screen.getAllByRole('radio');

		// Assert that there are exactly 3 radio buttons
		expect(genderRadios).toHaveLength(3);

		// Query for specific labels
		const [otherGenderRadio, maleGenderRadio, femaleGenderRadio] = genderRadios;

		// Ensure that radio buttons are present and have correct values
		expect(otherGenderRadio).toBeInTheDocument();
		expect(maleGenderRadio).toBeInTheDocument();
		expect(femaleGenderRadio).toBeInTheDocument();

		// Check for the correct values in each radio button
		expect(otherGenderRadio).toHaveAttribute('value', 'other');
		expect(maleGenderRadio).toHaveAttribute('value', 'male');
		expect(femaleGenderRadio).toHaveAttribute('value', 'female');

		// Select "Male" radio button
		fireEvent.click(maleGenderRadio);
		expect(maleGenderRadio).toBeChecked();
		expect(femaleGenderRadio).not.toBeChecked();
		expect(otherGenderRadio).not.toBeChecked();

		// Select "Female" radio button
		fireEvent.click(femaleGenderRadio);
		expect(femaleGenderRadio).toBeChecked();
		expect(maleGenderRadio).not.toBeChecked();
		expect(otherGenderRadio).not.toBeChecked();
	});

	test('submit button is rendered and clickable', () => {
		render(
			<BrowserRouter>
				<MockLanguageProvider>
					<Register />
				</MockLanguageProvider>
			</BrowserRouter>
		);

		const submitButton = screen.getByRole('button', { name: /register/i });
		expect(submitButton).toBeInTheDocument();

		// Simulate button click
		fireEvent.click(submitButton);
	});
});
