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
				return value[0] !== ' ' && value.length >= 2
			},
			message: "The title cannot start with a blank space and must be at least 2 characters long.",

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
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],



}, {timestamps: true});

const Content = mongoose.model('Book', contentSchema)

module.exports = Content;