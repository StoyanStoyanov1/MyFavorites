const router = require('express').Router();
const contentService = require('../service/contentService');
const userService = require('../service/userService')

router.post('/create', async (req, res) => {
	try {
		const data = req.body;
		const content = await contentService.create(data);
		await userService.contentToList(content.userId, content._id);

		res.status(201).json(content)
	} catch (err) {
		res.status(500).json({message: err});
	}
})

module.exports = router;