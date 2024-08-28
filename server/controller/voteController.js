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

})

module.exports = router;