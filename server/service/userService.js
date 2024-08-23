const User = require('../models/user');

exports.create = async (userData) => await User.create(userData);

exports.findByEmail = async (email) => await User.findOne({ email }).lean();

exports.getAll = async () => await User.find().lean();

exports.getById = async (id) => await User.findById(id).lean();

exports.contentToList = async (userId, contentId) => await User.findByIdAndUpdate(userId, {$push: {contents: contentId}});

exports.deteleContent = async (userId, contentId) => await User.findByIdAndUpdate(userId, {$pull: {contents: contentId}}, {new: true});