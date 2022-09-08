const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const auth_controller = require('../controllers/authController');
const message_controller = require('../controllers/messageController');

// GET REQUESTS
router.get('/', message_controller.get_messages);
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
router.get('/create-message', (req, res, next) => {
  res.render('create-message', {
    user: req.user,
    title: 'Create message',
    errors: [],
  });
});
router.get('/test', (req, res) => res.render('test', { user: req.user }));

// POST REQUESTS
router.post('/create-user', user_controller.create_user_post);
router.post('/create-message', message_controller.create_message_post);

module.exports = router;
