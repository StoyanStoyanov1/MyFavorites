const router = require("express").Router();
const voteService = require("../service/voteService");

router.get('/:voteId', async (req, res) => {
	const voteId = req.params.voteId;

	try {
		const vote = await voteService.getVoteById(voteId);

		res.status(201).send(vote);
	} catch (err) {
		res.status(500).send({message: err});
	}

});

router.post('/voting/:voteId', async (req, res) => {
	const { voteId } = req.params;
	const { userId, rating } = req.body;

	try {
		const voting = await voteService.addVote(voteId, userId, rating);

		res.status(200).json(voting);
	} catch (err) {
		console.error('Error recording vote:', err);
		res.status(500).json({ message: 'Failed to record vote' });
	}
})

module.exports = router;