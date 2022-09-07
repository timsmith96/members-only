const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const auth_controller = require('../controllers/authController');

// GET REQUESTS
router.get('/', (req, res) =>
  res.render('home', { errors: [], title: 'home', user: req.user })
);
router.get('/index', (req, res) =>
  res.render('index', { errors: [], title: 'Sign up', user: req.user })
);
router.get('/login', (req, res) => {
  res.render('login', {
    messages: req.session.messages,
    user: req.user,
    title: 'Login',
  });
});
router.get('/log-out', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
router.get('/test', (req, res) => res.render('test', { user: req.user }));
router.post('/create-user', user_controller.create_user_post);

module.exports = router;
