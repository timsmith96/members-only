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
        console.log('hi');
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
        res.render('index', {
          firstname: req.body.firstname,
          errors: errors.array(),
          title: 'Sign up',
          user: req.user,
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

// exports.admin_post = [
//   body('admin-password', 'password required please').isLength({ min: 1 }),
//   async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.render('admin', {
//         title: 'Admin',
//         user: req.user,
//         errors: errors.array(),
//       });
//     } else {
//       if (req['body']['admin-password'] == 'reptileman123') {
//         const doc = await User.findById(req.user.id);
//         doc.admin = true;
//         await doc.save();
//         res.render('admin', {
//           title: 'Admin',
//           user: doc,
//           errors: errors.array(),
//         });
//       } else {
//         res.render('admin', {
//           title: 'Admin',
//           user: req.user,
//           errors: errors.array(),
//         });
//       }
//     }
//   },
// ];

exports.admin_post = [
  body('admin-password', 'password required please').isLength({ min: 1 }),
  body('admin-password').custom((value, { req }) => {
    if (value !== 'reptileman123') {
      throw new Error('sorry - that password is incorrect');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('admin', {
        title: 'Admin',
        user: req.user,
        errors: errors.array(),
      });
    } else {
      const doc = await User.findById(req.user.id);
      doc.admin = true;
      await doc.save();
      res.render('admin', {
        title: 'Admin',
        user: doc,
        errors: errors.array(),
      });
    }
  },
];
