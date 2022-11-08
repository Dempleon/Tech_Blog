const router = require('express').Router();
const { BlogPost } = require('../../models');
const authorize = require('../../ultils/auth');

router.post('/', authorize, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            subject: req.body.subject,
            blog_text: req.body.blog_text,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlogPost);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', authorize, async (req, res) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogPostData) {
            res.status(404).json({message: 'No blog post found with this id!'});
            return;
        }

        res.status(200).json(blogPostData);
    } catch(err) {
        res.status.json(err);
    }
});

module.exports = router;