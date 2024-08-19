const Content = require('../models/Content');

exports.create = async (contentData) => await Content.create(contentData);

exports.findByType = async (type) => await Content.findOne({ type }).lean();

exports.findById = async (id) => await Content.findById(id);