const router = require("express").Router();
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const {SECRET} = require('../config');
const bcrypt = require('bcrypt')

const options = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'Strict'
}

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		const existingUser = await userService.findByEmail(userData.email);

		if (existingUser) {
			throw new Error('User already exists')
		}

		const createdUser = await userService.create(userData);

		const token = await generateToken(createdUser);

		res.cookie('auth', token.accessToken, options);
		res.status(201).json({accessToken: token.accessToken, user: token.user});


	} catch (error) {
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(error => error.message);
			return res.status(400).json({message: errors.join(', ')});
		}
		res.status(500).json({message: 'Server error'});
	}
});

async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await jwt.sign(payload, SECRET, {expireIn: '2h'});
	return token;
}

module.exports = router;