import React, {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as authService from '../service/userService.js';
import Path from "../utils/paths.js";
import usePersistedState from "../hooks/usePersistedState.js";


const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [auth, setAuth] = usePersistedState('auth', {});

	const registerSubmitHandler = async (values) => {
		const result = await authService.register(values);

		if (result.accessToken) {
			setAuth(result.user);
			localStorage.setItem('accessToken', result.accessToken);
			navigate(Path.Home);
		} else {
			console.error('No access token returned');
		}

	};

	const values = {
		registerSubmitHandler,
		username: auth.username,
		_id: auth._id,
		isAuthenticated: !!auth.email,
	};

	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;