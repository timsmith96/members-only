const User = require('../models/user');
const async = require('async');
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.create_user_post = [
  body('firstname', 'first name required please').isLength({ min: 1 }).trim(),
  body('lastname', 'last name required please').isLength({ min: 1 }).trim(),
  body('username', 'username required please').isLength({ min: 1 }).trim(),
  body('username').custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('Username already in use');
      }
    });
  }),
  body('password', 'password must be longer than 3 characters please').isLength(
    { min: 3 }
  ),
  body('confirm-password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        console.log(errors.array());
        res.render('index', {
          firstname: req.body.firstname,
          errors: errors.array(),
          title: 'Sign up',
        });
      } else {
        user.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/login');
        });
      }
    });
  },
];
