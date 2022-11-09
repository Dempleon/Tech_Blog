const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const authorize = require('../ultils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogposts = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['userName']
                },
            ],
        });

        const blog = blogData.get({plain: true});

        res.render('blogpost', {
            blog, 
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/users', authorize, async (req, res) => {
    try {

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{model: BlogPost}],
        });

        const user = userData.get({plain: true});

        res.render('user', { 
            user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/user');
        return;
    }

    res.render('login');
})

module.exports = router;