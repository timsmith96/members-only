const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.get_messages = (req, res) => {
  return Message.find({})
    .populate('createdBy')
    .sort('-date')
    .then((messages) => {
      res.render('home', { title: 'Home', user: req.user, messages: messages });
    });
};

exports.create_message_post = [
  body('message-title', 'title required please').isLength({ min: 1 }).trim(),
  body('message', 'message required please').isLength({ min: 1 }).trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('create-message', {
        title: 'Create message',
        user: req.user,
        errors: errors.array(),
      });
    } else {
      const message = new Message({
        title: req['body']['message-title'],
        text: req.body.message,
        createdBy: req.user.id,
        date: new Date(),
      });
      message.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    }
  },
];
