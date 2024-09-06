const Comment = require('../models/Comment');

exports.create = async (data) => await Comment.create(data);

exports.getByContentId = async (contentId) => await Comment.find({contentId});

exports.remove = async (commentId) => await Comment.findByIdAndDelete(commentId);

exports.getOne = async (commentId) => await Comment.findById(commentId).lean();