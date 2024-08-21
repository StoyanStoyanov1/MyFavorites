import mainUrl from "../utils/mainUrl.js";
import request from "../lib/request.js";

const baseUrl = mainUrl + 'content';

export const create = async (data) => {
	const result = await request('POST', `${baseUrl}/create`, data)
	return result;
}

export const getAll = async (path) => {
	const result = await request('GET', `${baseUrl}/${path}`)

	return result;
}

export const getSearchResult = async (title, genre, path) => {
	const result = await request('POST', `${baseUrl}/${path}/search`, {title, genre});

	return result;
}

export const getById = async (id) => {
	const result = await request('GET', `${baseUrl}/info/${id}`);

	return result;
}