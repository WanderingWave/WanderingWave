'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const messageController = require('./controllers').Messages

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.bodyParser.urlencoded({ extended: false }));

app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views')); // set the views folder
app.set('view engine', 'ejs');

app.use(middleware.auth.session); // sets up express session

app.use(middleware.passport.initialize());
app.use(middleware.passport.session());

app.use(middleware.flash());
app.use((req, res, done) => {
  req.flash('loginMessage', 'Please log in');
  done();
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/messages', routes.messages);

app.post('/user', (req, res) => {
  messageController.create(req, res);
  res.end("Successful Test");
});

module.exports = app;
