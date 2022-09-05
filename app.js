var express = require('express');
path = require('path');
var bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', indexRouter);
app.use('/', authRouter);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => console.log('app listening on port 3000...'));

module.exports = app;
