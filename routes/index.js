const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/', (req, res) => res.render('index'));
router.post('/create-user', user_controller.create_user_post);

module.exports = router;
