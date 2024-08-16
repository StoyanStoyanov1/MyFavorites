const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const jwt = require("jsonwebtoken");
const { SECRET } = require('../config');
const bcrypt = require('bcrypt');

const options = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'Strict'
};

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		const createdUser = await userService.create(userData);
		const token = await generateToken(createdUser);

		res.cookie('auth', token.accessToken, options);
		res.status(201).json({ accessToken: token.accessToken, user: token.user });
	} catch (error) {
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(err => err.message);
			return res.status(400).json({ message: errors.join(', ') });
		}
		res.status(500).json({ message: 'Server error' });
	}
});

async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });
	return { accessToken: token, user };
}

module.exports = router;
