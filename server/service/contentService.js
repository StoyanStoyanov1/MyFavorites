const Content = require('../models/Content');

exports.create = async (contentData) => await Content.create(contentData);

exports.findByType = async (type) => await Content.find({ type }).lean();

exports.findById = async (id) => await Content.findById(id).lean();

exports.search = async (type, title, genre) => {
	const query = {};

	if (type) {
		query.type = type;
	}

	if (title) {
		query.title = { $regex: title, $options: 'i' };
	}

	if (genre) {
		query.genre = { $in: genre};
	}

	return await Content.find(query).lean();
};

exports.edit = async (values, contentId) => await Content.findByIdAndUpdate(contentId, values, {new: true});

exports.delete = async (contentId) => await Content.findByIdAndDelete(contentId);

exports.addUserToFavoritesList = async (contentId, userId) => await Content.findByIdAndUpdate(contentId, {$push: {'favorites_user_ids': userId}}, {new: true}).lean();

exports.removeUserFromFavoritesList = async (contentId, userId) => await Content.findByIdAndUpdate(contentId, {$pull: {'favorites_user_ids': userId}}, {new: true}).lean();

exports.addCommentToCommentsArray = async (contentId, commentId) => await Content.findByIdAndUpdate(contentId, {$push: {comments: commentId}});

exports.removeCommentFromCommentsArray = async (contentId, commentId) => await Content.findByIdAndUpdate(contentId, {$pull: {comments: commentId}})