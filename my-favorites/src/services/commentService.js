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
};

export const removeComment = async (commentId) => {
    const removedComment = await request("DELETE", `${baseUrl}/${commentId}`);

    return removedComment;
};

export const edit = async (commentId, newText) => {
    const newComment = await request('PUT', `${baseUrl}/${commentId}`, {text: newText});

    return newComment;
}