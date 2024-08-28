const Vote = require('../models/vote');

exports.createVote = async () => await Vote.create({reviewers: new Map()});

exports.deleteVote = async (voteId) => await Vote.deleteOne(voteId);

exports.getVoteById = async (voteId) => await Vote.findById(voteId).lean();

exports.addVote = async (voteId, userId, rating) => {
	try {
		const vote = await Vote.findById(voteId);

		if (!vote) {
			throw new Error(`Cannot find Vote with id ${voteId} with id ${userId}`);
		}

		vote.reviewers.set(userId, rating);

		await vote.save();

		return vote;

	} catch (err) {
		console.error("Error updating vote:", err.message);
		throw err;
	}
};