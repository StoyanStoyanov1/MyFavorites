const userService = require('./userService')
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const bcrypt = require('bcrypt')

exports.register = async (userData) => {
	const existingUser = await userService.findByEmail(userData.email);
	if (existingUser) {
		throw new Error('User already exists');
	}

	const createdUser = await userService.create(userData)
	const token = await generateToken(createdUser);

	return {accessToken: token, user: createdUser};
}

exports.login = async ({email, password}) => {
	const user = await userService.findByEmail({email});

	if (!user) {
		throw new Error('User does not exist');
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		throw new Error('Invalid password');
	}

	const token = await generateToken(user);

	return {accessToken: token, user: user};
}

async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
	return token;
}