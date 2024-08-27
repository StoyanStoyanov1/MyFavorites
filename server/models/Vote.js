const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
	reviewers: {
		type: Map,
		of: Number,
		required: true
	}
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;