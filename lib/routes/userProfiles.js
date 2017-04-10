var express = require('express');
var router = express.Router();
var models = require('express-cassandra');
const Uuid = require('cassandra-driver').types.Uuid;

function handleError(error, response, statusCode) {
    response.statusCode = statusCode;
    console.log(error);
    response.json(error);
}

function stripRequestBody(userProfile) {
    return {
        email: userProfile.email,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        displayName: userProfile.displayName,
        fbid: userProfile.fbid,
        picture: userProfile.picture,
        description: userProfile.description,
        devices: userProfile.devices
    }
}

router.get('/userProfiles', function (request, response, next) {
    models.instance.userProfiles.find({}, function (err, userProfiles) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        response.json(userProfiles)
    });
});

router.post('/userProfiles', function (request, response, next) {
    if (!request.body) {
        response.status(405);
        response.json({
            "error": "Invalid data."
        });
    } else {
        var userProfile = new models.instance.userProfiles(stripRequestBody(request.body));
        models.instance.userProfiles.findOne({ email: userProfile.email }, { allow_filtering: true }, function (err, existingUserProfile) {
            if (err) {
                handleError(err, response, 400);
                return;
            }
            if (existingUserProfile) {
                handleError({ "error": "User with this email already exists" }, response, 400);
            } else {
                userProfile.save(function (error, result) {
                    if (error) {
                        handleError(error, response, 400);
                    } else {
                        models.instance.userProfiles.findOne({ email: userProfile.email }, { allow_filtering: true }, function (err, newUserProfile) {
                            console.log(result);
                            response.json(newUserProfile);
                        });
                    }
                });
            }
        });
    }
});

router.put('/userProfiles/', function (request, response, next) {
    models.instance.userProfiles.findOne({ id: Uuid.fromString(request.body.id) }, function (err, userProfile) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        if (userProfile) {
            models.instance.userProfiles.update({ id: userProfile.id }, stripRequestBody(request.body), function (err, result) {
                if (err) {
                    handleError(err, response, 400);
                    return;
                }
                models.instance.userProfiles.findOne({ id: userProfile.id }, function (err, updatedUserProfile) {
                    response.json(updatedUserProfile);
                });
            });
        } else {
            response.statusCode = 404;
            response.json("error: Could not find user");
        }
    });
});

router.get('/userProfiles/:id', function (request, response, next) {
    models.instance.userProfiles.findOne({ id: Uuid.fromString(request.params.id) }, function (err, userProfile) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        if (userProfile) {
            response.json(userProfile)
        } else {
            response.statusCode = 404;
            response.json("error: Could not find user");
        }
    });
});

router.delete('/userProfiles/:id', function (request, response, next) {
    models.instance.userProfiles.findOne({ id: Uuid.fromString(request.params.id) }, function (err, userProfile) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        if (userProfile) {
            models.instance.userProfiles.delete({ id: userProfile.id }, function (err, result) {
                if (err) {
                    handleError(err, response, 400);
                    return;
                }
                console.log(result);
                response.json();
            });
        } else {
            response.statusCode = 404;
            response.json("error: Could not find user");
        }
    });
});

module.exports = router;