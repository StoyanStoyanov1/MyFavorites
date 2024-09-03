const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	contentId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	text: {
		type: String,
		required: true,
		validate: {
			validator: (v) => v.trim().length > 0,
		},
		message: "The message cannot be empty.",
	}
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
