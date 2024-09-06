const router = require('express').Router();
const { json } = require('express');
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
});

router.get('/:contentId', async (req, res) => {
    const contentId = req.params.contentId;

    try {
        const comments = await commentService.getByContentId(contentId);

        res.status(201).json(comments);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.delete('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;


    try {
        const comment = await commentService.getOne(commentId);

        await contentService.removeCommentFromCommentsArray(comment.contentId, commentId);
        await commentService.remove(commentId);
        res.status(201).json({message: "The comment is deleted!"});

    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.put('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const data = req.body;
    
    try {
        const comment = await commentService.edit(commentId, data);

        res.status(201).json(comment)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})


module.exports = router;