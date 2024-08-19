import mainUrl from "../utils/mainUrl.js";
import request from "../lib/request.js";

const baseUrl = mainUrl + 'content';

export const create = async (data) => {
	const result = await request('POST', `${baseUrl}/create`, data)
	return result;
}