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
		query.genre = genre;
	}

	return await Content.find(query).lean();
};