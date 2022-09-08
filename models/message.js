const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: { type: String, required: true, maxLength: 10000 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
});

MessageSchema.virtual('niceDate').get(function () {
  const date = DateTime.fromJSDate(this.date).toFormat('f');
  return date;
});

module.exports = mongoose.model('Message', MessageSchema);
