const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
	},
	birthDate: {
		type: String,
	},
	books: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	}],
	podcasts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PodCast'
	}],
	movies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie'
	}],
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}
	]

}, {timestamps: true});

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
	}

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;