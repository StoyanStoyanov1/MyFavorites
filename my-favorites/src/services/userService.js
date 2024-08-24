import mainUrl from "../utils/mainUrl.js";
import request from "../lib/request.js";

const baseUrl = mainUrl + 'user';

export const getById = async (userId) => {
	const result = await request('GET', `${baseUrl}/${userId}`);

	return result;
};

export const addFavorite = async (contentId, userId) => {
	const result = await request('PUT', `${baseUrl}/add-favorite/${contentId}`, {userId});

	return result;
}

export const removeFavorite = async (contentId, userId) => {
	const result = await request('PUT', `${baseUrl}/remove-favorite/${contentId}`, {userId});

	return result;
}

