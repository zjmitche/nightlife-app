const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const db = 'mongodb://zjmitche:zjmitche-99@ds139352.mlab.com:39352/bar-search';
mongoose.Promise = bluebird;
mongoose.connect(db);

const users = require('./server/routes/users');
const yelp = require('./server/routes/yelp');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(express.static(__dirname + '/dist'));

app.use('/api/users', users);
app.use('/api/search', yelp);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});