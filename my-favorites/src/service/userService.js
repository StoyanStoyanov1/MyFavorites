import request from "../lib/request.js";
import mainUrl from "../utils/mainUrl.js";

const baseUrl = mainUrl + 'users';

export const register = async (data) => {
	const result = await request('POST', `${baseUrl}/register`, data);

	return result;
}

