var express = require('express');
var router = express.Router();
var models = require('express-cassandra');

router.get('/userProfiles', function (request, response, next) {
    models.instance.userProfiles.find({}, function (err, userProfiles) {
        if (err) {
            response.render(err);
            return;
        }
        //Note that returned variable john here is an instance of your model,
        //so you can also do john.delete(), john.save() type operations on the instance.
        //console.log('Found ' + john.name + ' to be ' + john.age + ' years old!');
        response.json(userProfiles)
    });
});

module.exports = router;