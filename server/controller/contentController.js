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

router.get('/books', async (req, res) => {
	try {
		const books = await contentService.findByType('book');
		res.status(201).json(books);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.post('/books/search', async (req, res) => {
	try {
		const {title, genre} = req.body
		const searchResult = await contentService.search('book', title, genre);
		res.status(201).json(searchResult);
	} catch (err) {
		res.status(500).json({message: err});
	}
})

module.exports = router;