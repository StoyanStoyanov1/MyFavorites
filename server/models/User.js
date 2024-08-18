const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length >= 2 && value.length <= 12;
			},
			message: "The username must be between 2 and 12 characters long."
		}
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			},
			message: (props) => `${props.value} is not a valid email!`

		}
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				if (value.length < 6) {
					return false;
				}
				if (!/[a-z]/.test(value)) {
					return false;
				}
				if (!/[A-Z]/.test(value)) {
					return false;
				}
				return /[0-9]/.test(value);
			},
			message: "The password needs one lowercase, one uppercase letter, one digit, and at least 6 characters."
		}
	},
	gender: {
		type: String,
	},
	aktiv: {
		type: Boolean,
	},
	birthDate: {
		type: String,
	},
	contents: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Content'
	}],

}, {timestamps: true});

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
	}

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;