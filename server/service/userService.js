const User = require('../models/user');

exports.create = async (userData) => await User.create(userData);

exports.findByEmail = async (email) => await User.findOne({ email }).lean();

exports.getAll = async () => await User.find().lean();

exports.getById = async (id) => await User.findById(id).lean();