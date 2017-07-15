var express = require('express');
var router = express.Router();
var models = require('express-cassandra');
const Uuid = require('cassandra-driver').types.Uuid;

function handleError(error, response, statusCode) {
    response.statusCode = statusCode;
    console.log(error);
    response.json(error);
}

router.get('/suggestions', function (request, response, next) {
    models.instance.suggestions.find({}, function (err, suggestions) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        response.json(suggestions)
    });
});

router.post('/suggestions', function (request, response, next) {
    if (!request.body) {
        response.status(405);
        response.json({
            "error": "Invalid data."
        });
    } else {
        var suggestion = new models.instance.suggestions(request.body);

        suggestion.save(function (error, result) {
            if (error) {
                handleError(error, response, 400);
            } else {
                console.log(result);
            }
        });
    }
});

router.put('/suggestions/', function (request, response, next) {
    models.instance.suggestions.findOne({ id: Uuid.fromString(request.body.id) }, function (err, suggestion) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        if (suggestion) {
            models.instance.suggestions.update({ id: suggestion.id }, stripRequestBody(request.body), function (err, result) {
                if (err) {
                    handleError(err, response, 400);
                    return;
                }
                models.instance.suggestions.findOne({ id: suggestion.id }, function (err, updatedSuggestion) {
                    response.json(updatedSuggestion);
                });
            });
        } else {
            response.statusCode = 404;
            response.json("error: Could not find suggestion");
        }
    });
});

router.get('/suggestions/:id', function (request, response, next) {
    models.instance.suggestions.findOne({ id: Uuid.fromString(request.params.id) }, function (err, suggestion) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        if (suggestion) {
            response.json(suggestion)
        } else {
            response.statusCode = 404;
            response.json("error: Could not find user");
        }
    });
});

router.delete('/suggestions/:id', function (request, response, next) {
    models.instance.suggestions.findOne({ id: Uuid.fromString(request.params.id) }, function (err, suggestion) {
        if (err) {
            handleError(err, response, 400);
            return;
        }
        if (suggestion) {
            models.instance.suggestions.delete({ id: suggestion.id }, function (err, result) {
                if (err) {
                    handleError(err, response, 400);
                    return;
                }
                console.log(result);
                response.json();
            });
        } else {
            response.statusCode = 404;
            response.json("error: Could not find suggestion");
        }
    });
});

module.exports = router;