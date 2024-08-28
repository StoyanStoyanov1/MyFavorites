import request from "../lib/request.js";
import mainUrl from "../utils/mainUrl.js";

const baseUrl = mainUrl + 'vote';


export const getById = async (voteId) => {
	const vote = await request('GET', `${baseUrl}/${voteId}`);

	return vote;
}

export const voting = async (voteId, userId, rating) => {

	await request('POST', `${baseUrl}/voting/${voteId}`, {userId, rating});
}