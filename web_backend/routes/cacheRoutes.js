var express = require('express');
var request = require('request');


var routes = function () {

    var cacheRouter = express.Router();

    cacheRouter.route('/nodes/:port').post(function (req, res) {

        var port = req.params.port;

        request('http://localhost:6899/nodes/' + port, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(body.toString());
            }
        });
    });

    cacheRouter.route('/nodes').get(function (req, res) {
        request('http://localhost:6899/nodes', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(body.toString());
            }
        });
    });

    cacheRouter.route('/nodes/:port').delete(function (req, res) {

        var port = req.params.port;


        request('http://localhost:6899/' + port, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(body.toString());
            }
        });
    });

    cacheRouter.route('/keys/:key_id/:value').put(function (req, res) {

        var keyID = req.params.key_id;
        var value = req.params.value;

        request('http://localhost:6899/' + keyID +"/" + value, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(body.toString());
            }
        });
    });

    cacheRouter.route('/notify/:port').post(function (req, res) {

        var port = req.params.port;

        request('http://localhost:6899/' + port, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(body.toString());
            }
        });
    });

    cacheRouter.route('/notify/:port').delete(function (req, res) {

        var port = req.params.port;

        request('http://localhost:6899/' + port, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(body.toString());
            }
        });
    });


    return cacheRouter;
};


module.exports = routes;