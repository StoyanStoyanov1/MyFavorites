import request from "../lib/request.js";
import mainUrl from "../utils/mainUrl.js";

const baseUrl = mainUrl + 'auth';

export const register = async (data) => {
	const result = await request('POST', `${baseUrl}/register`, data);
	return result;
}

export const login = async (data) => {
	const result = await request('POST', `${baseUrl}/login`, data);

	return result
}

export const logout = () => {
	return request('GET', `${baseUrl}/logout`)
}

