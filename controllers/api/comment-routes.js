const router = require('express').Router();
const { Comment } = require('../../models');
const authorize = require('../../ultils/auth');

router.post('/', authorize, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        });

        res.status(200).json(newComment);
    } catch(err) {
        res.status(400).json(err);
    }
});

// todo: fix delete route later, it might not work
router.delete('/:id', authorize, async (req, res) => {
    try {
        const commentData = await Comment.delete({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if(!commentData) {
            res.status(400).json({ message: 'No comment found with this id' });
            return;
        }
    } catch(err) {
        res.status(500).json(err)
    }
})