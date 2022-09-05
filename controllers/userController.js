const User = require('../models/user');
const async = require('async');

exports.create_user_post = (req, res, next) => {
  console.log(req.body);
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
