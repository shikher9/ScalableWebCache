var express = require('express');

var routes = function (app, User, connection, jwt) {

    var userRouter = express.Router();

    //handle the request
    userRouter.route('/signup').post(function (req, res) {

        //get username, email , password and name
        var username = req.body.username;
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;


        //check whether user already exists or not
        var query = connection.query('select count(*) as cnt from users where email_id = ?', [email], function (err, results) {

            if (results[0].cnt === 0) {
                //user does not exists create user
                var values = {email_id: email, user_name: username, password: password, name:name};

                var query = connection.query('INSERT INTO Users SET ?', values, function (err, results) {
                    if (err)
                        return res.json(err);
                    else
                        return res.json({"result": "true"});
                });

            } else {
                return res.json({"result": "false"});
            }
        });


    });

    userRouter.route('/login').post(function (req, res) {


        //get email and password
        var email = req.body.email;
        var password = req.body.password;

        //check if exists
        var query = connection.query('select count(*) as cnt from users where email_id = ?', [email, password], function (err, results) {
            if (results[0].cnt === 0) {
                return res.json({"result": "false"});
            } else {

                //create token and set expiration time to one day
                var expires = moment().add('days', 1).valueOf();
                var token = jwt.encode({
                    iss: email,
                    exp: expires
                }, app.get('jwtSecret'));

                return res.json({
                    "result": "true",
                    "token": token
                });
            }
        });
    });

    userRouter.route('/logout').get(function (req, res) {

        return res.json({"result": "true"});
    });


    return userRouter;
};


module.exports = routes;