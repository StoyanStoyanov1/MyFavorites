const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		require: true,
	},
	type: {
		type: String,
		enum: ['book', 'movie', 'podcast', 'series'],
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
		type: Array,
		require: true,
	},
	year: {
		type: String,
		require: true,
	},
	creator: {
		type: String,
		require: true,
		validate: {
			validator: value => {
				return value.length >= 2 && value.length <= 20;
			},
			message: props => `This message ${props.value}is too short or too long; it should be between 2 and 20 characters.`
		}
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
	country: {
		type: String,
		required: true,
	},

	voters: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vote',
	},
	image: {
		type: String,
		validate: {
			validator: (value) => {
				return !value.length || /^https?:\/\//.test(value)
			},
			message: "Your link must start with http:// or https://"
		}
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	favorites_user_ids: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],


}, {timestamps: true});

const Content = mongoose.model('Contents', contentSchema)

module.exports = Content;