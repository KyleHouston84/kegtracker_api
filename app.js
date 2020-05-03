const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Route sources
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const kegsRouter = require('./routes/kegs');
const tapsRouter = require('./routes/taps');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/kegs', kegsRouter);
app.use('/taps', tapsRouter);
app.use('/users', usersRouter);

module.exports = app;
