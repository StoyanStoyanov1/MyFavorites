const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	rating: {
		type: Number,
		required: true,
	}
}, {timestamps: true});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

