const router = require('express').Router();
const { Comment } = require('../../models');
const authorize = require('../../ultils/auth');

router.post('/', authorize, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
        })
    }
})