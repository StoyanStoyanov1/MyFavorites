const router = require('express').Router();
const commentService = require('../service/commentService');
const contentService = require('../service/contentService');

router.post('/create/:contentId', async (req, res) => {
    const contentId = req.params.contentId;
    const data = req.body;

    try {
        const comment = await commentService.create(data);
        contentService.addCommentToCommentsArray(contentId, comment._id);
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({message: err});
    }
}) 

module.exports = router;