var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var models = require('./lib/models/models');
var userProfile = require('./lib/routes/userProfile');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/', userProfile);

app.listen(3010, function() {
    console.log('Server started on port 3010...');
});