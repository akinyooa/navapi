var express = require('express');
var router = express.Router();
var models = require('express-cassandra');
const Uuid = require('cassandra-driver').types.Uuid;

function handleError(error, response) {
    response.render(error);
}

router.get('/userProfiles', function(request, response, next) {
    models.instance.userProfiles.find({}, function(err, userProfiles) {
        if (err) {
            handleError(err, response);
            return;
        }
        response.json(userProfiles)
    });
});

router.get('/userProfiles/:id', function(request, response, next) {
    models.instance.userProfiles.findOne({ id: Uuid.fromString(request.params.id) }, function(err, userProfile) {
        if (err) {
            handleError(err, response);
            return;
        }
        response.json(userProfile)
    });
});

router.post('/userProfiles', function(request, response, next) {
    if (!request.body) {
        response.status(405);
        response.json({
            "error": "Invalid data."
        });
    } else {
        var userProfile = new models.instance.userProfiles(request.body);
        userProfile.save(function(error, result) {
            if (error) {
                response.send(error);
            } else {
                response.json(userProfile);
            }
        });
    };
});

module.exports = router;