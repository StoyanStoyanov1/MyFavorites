const Comment = require('../models/Comment');

exports.create = async (data) => await Comment.create(data);

exports.getByContentId = async (contentId) => await Comment.find({contentId});