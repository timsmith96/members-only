const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const auth_controller = require('../controllers/authController');

router.get('/', (req, res) => res.render('index', { errors: [] }));
router.post('/create-user', user_controller.create_user_post);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', auth_controller.login_user);

module.exports = router;
