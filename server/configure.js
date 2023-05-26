/*
Server configuration
*/

var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'), // templating engine for views
    express = require('express'),
    bodyParser = require('body-parser'), // pack any form data into req.body
    cookieParser = require('cookie-parser'), // allow cookies to be sent and received
    morgan = require('morgan'), // logging
    methodOverride = require('method-override'), //allow UPDATE AND PUT to be faked using hidden fields
    errorHandler = require('errorhandler'); // handle errors occuring during the middleware process

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        uploadDir: path.join(__dirname, 'public/upload/temp')
    }));

    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);
    app.use('/public/', express.static(path.join(__dirname, '../public'))); // static allows us to serve static data files eg images, css, js

    if ('development' === app.get('env')) {
        app.use(errorHandler);
    }

    // register handlebars as the default templating engine
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials']
    }).engine);
    app.set('view engine', 'handlebars');

    return app;
};