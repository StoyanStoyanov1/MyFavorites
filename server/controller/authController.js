const router = require('express').Router();
const authService = require('../service/authService');
const {getErrorMessage} = require('../utils/errorUtils');
const userService = require('../service/userService')

const options = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'Strict'
};

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		const { accessToken, user } = await authService.register(userData);
		res.cookie('auth', accessToken, options);
		res.status(201).json({ accessToken, user });
	} catch (error) {
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(err => err.message);
			return res.status(400).json({ message: errors.join(', ') });
		}
		if (error.message === 'User already exists') {
			return res.status(401).json({ message: error.message });
		}
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/login', async (req, res) => {
	const userData = req.body;

	try {
		console.log(userData)
		const {accessToken, user} = await authService.login(userData);
		res.cookie('auth', accessToken, options);
		res.status(201).json({accessToken, user});
	} catch (error) {
		if (error.message === 'User does not exist' || error.message === 'Invalid password') {
			return res.status(401).json({ message: error.message });
		}
		res.status(500).json({error: getErrorMessage(error)})
	}
})

router.get('/logout',  (req, res) => {
	res.clearCookie('auth');
	res.status(204).end();

})

module.exports = router;