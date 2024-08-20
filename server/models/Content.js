const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		require: true,
	},
	type: {
		type: String,
		enum: ['book', 'movie', 'podcast'],
		required: true
	},
	title: {
		type: String,
		require: true,
		trim: true,
		validate: {
			validator: (value) => {
				return value.length >= 2
			},
			message: "The title must be at least 2 characters long.",
		}
	},
	genre: {
		type: String,
		require: true,
	},
	year: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
		trim: true,
		validate: {
			validator: (value) => {
				return value.length >= 20;
			},
			message: "The description must be at least 20 characters long."
		},
	},
	image: {
		type: String,
		validate: {
			validator: (value) => {
				return /^https?:\/\//.test(value)
			},
			message: "Your link must start with http:// or https://"
		}
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],



}, {timestamps: true});

const Content = mongoose.model('Contents', contentSchema)

module.exports = Content;