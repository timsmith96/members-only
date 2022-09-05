const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true, maxLength: 20 },
  lastname: { type: String, required: true, maxLength: 20 },
  username: { type: String, required: true, maxLength: 20 },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
