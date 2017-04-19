var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var models = require('./lib/models/models');
var userProfiles = require('./lib/routes/userProfiles');

app.use('/dist', express.static(path.join(__dirname, 'public')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use('/api/v1/', userProfiles);

app.listen(port, function () {
    console.log('Server started on port %s...', port);
});