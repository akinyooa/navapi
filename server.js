var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var models = require('./lib/models/models');
var userProfiles = require('./lib/routes/userProfiles');

app.use('/swagger', express.static(path.join(__dirname, 'public')));
app.use('/swagger', express.static(path.join(__dirname, ('api/swagger'))));
app.use('/api/v1/', userProfiles);

app.get('/swagger', function (request, response) {
    response.render(path.join(__dirname, '/public/index'), { yaml: process.env.NODE_ENV == "dev" ? "/swagger/swagger.dev.yaml" : "/swagger/swagger.yaml" });
});

app.listen(port, function () {
    console.log('Server started on port %s...', port);
});