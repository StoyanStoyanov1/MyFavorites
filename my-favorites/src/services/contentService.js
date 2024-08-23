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

export const getSearchResult = async (title, genre, type) => {
	const result = await request('POST', `${baseUrl}/contents/search`, {title, genre, type});

	return result;
}

export const getById = async (id) => {
	const result = await request('GET', `${baseUrl}/info/${id}`);

	return result;
}

export const edit = async (values, contentId) => {
	const result = await request('PUT', `${baseUrl}/edit/${contentId}`, values);

	return result;
};

export const remove = async (contentId) => {
	const result = await request('DELETE', `${baseUrl}/${contentId}`);

	return result;
}