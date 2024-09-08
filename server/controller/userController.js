const router = require('express').Router();
const userService = require('../service/userService');
const contentService = require('../service/contentService');

router.put('/add-favorite/:contentId', async (req, res) => {
	const contentId = req.params.contentId;
	const userId = req.body.userId;


	try {
		await userService.addFavorite(userId, contentId);
		await contentService.addUserToFavoritesList(contentId, userId);

		res.status(200)

	} catch (err) {
		res.status(500).json({message: err})
	}
});

router.put('/remove-favorite/:contentId', async (req, res) => {
	const contentId = req.params.contentId;
	const userId = req.body.userId;
	try {
		const user = await userService.removeFavorite(userId, contentId);
		await contentService.removeUserFromFavoritesList(contentId, userId);

		res.status(200).json(user);

	} catch (err) {
		res.status(500).json({message: err})
	}
});

router.get('/:userId', async (req, res) => {
	const userId = req.params.userId;

	try {
		const user = await userService.getById(userId);
		delete user.password;
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.put('/aktiv/:userId', async (req, res) => {
	const userId = req.params.userId;

	try {
		const user = await userService.configUser(userId);
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({message: err});
	}
})


module.exports = router;