const router = require('express').Router();
const userService = require('../service/userService');
const {SECRET} = require("../config");
const {sign} = require("jsonwebtoken");
const {findByEmail} = require("../service/userService");
const bcrypt = require('bcrypt')


const options = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'Strict'
};

router.post('/register', async (req, res) => {
	const userData = req.body;
	const existingUser = await userData.findByEmail(userData.email);

	if (existingUser) {
		throw new Error('User already exists');
	}

	try {
		const user = await userService.create(userData);
		const token = await generateToken(user)
		res.cookie('auth', token, user);
		res.status(201).json({token, user});
	} catch (error) {
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(err => err.message);
			return res.status(400).json({message: errors.join(', ')});
		}
		res.status(500).json({message: 'Server error'});
	}
});

router.post('/login', async (req, res) => {

		const userData = req.body;
		const user = await userService.findByEmail(userData.email)

		if (!user) {
			throw new Error('User does not exist');
		}
		const isValid = await bcrypt.compare(userData.password, user.password);

		if (!isValid) {
			throw new Error('Invalid password');
		}

	try {
		const token = await generateToken(user)
		res.cookie('auth', token, user);
		res.status(201).json({token, user});
	} catch (err) {
		res.status(500).json({error: err});
	}
})

router.get('/logout', (req, res) => {
	res.clearCookie('auth');
	res.status(204).end();

})

async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await sign(payload, SECRET, {expiresIn: '2h'});
	return token;
}

module.exports = router;