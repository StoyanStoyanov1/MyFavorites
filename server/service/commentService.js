const Comment = require('../models/Comment');

exports.create = async (data) => await Comment.create(data);

exports.getAll = async () => await Comment.getAll();