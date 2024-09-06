import request from "../lib/request";
import mainUrl from "../utils/mainUrl";

const baseUrl = mainUrl + 'comment';

export const create = async (contentId, data) => {

    const comment = await request('POST', `${baseUrl}/create/${contentId}`, data);
    return comment;
   
};

export const getByContentId = async (contentId) => {
    const comments = await request('GET', `${baseUrl}/${contentId}`);

    return comments;
}