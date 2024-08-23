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

router.get('/movies', async (req, res) => {
	try {
		const books = await contentService.findByType('movie');
		res.status(201).json(books);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.post('/movies/search', async (req, res) => {
	try {
		const values = req.body
		const searchResult = await contentService.search('movie', values);
		res.status(201).json(searchResult);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.get('/podcasts', async (req, res) => {
	try {
		const books = await contentService.findByType('podcast');
		res.status(201).json(books);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.post('/podcasts/search', async (req, res) => {
	try {
		const {title, genre} = req.body
		const searchResult = await contentService.search('podcast', title, genre);
		res.status(201).json(searchResult);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.get('/info/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const result = await contentService.findById(id);
		res.status(201).json(result);
	} catch (err) {
		res.status(404).json({message: err});
	}
})

router.put('/edit/:contentId', async (req, res) => {
	try {
		const contentId = req.params.contentId;
		const values = req.body;
		const result = await contentService.edit(values, contentId);
		res.status(201).json(result);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.delete('/:contentId', async (req, res) => {
	const contentId = req.params.contentId;

	try {
		 const content = await contentService.findById(contentId);
		 await contentService.delete(contentId);
		 await userService.deteleContent(content.userId, contentId);
		 res.status(201).json(content)
	} catch (err) {
		res.status(500).json({message: 'Content is not found!'})
	}
});

router.get('/my-recommends/:userId', async (req, res) => {
	const userId = req.params.userId;
	try {
		const user = await userService.getById(userId);
		const contestPromises = Object.values(user.contents).map( contentId => contentService.findById(contentId));
		const contests = await Promise.all(contestPromises)

		res.status(200).json([...contests]);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
module.exports = router;