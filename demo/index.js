// express configuration
var express = require('express');
var app = express();
var fx = require('node-fixtures');
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

// template engine
app.set('view engine', 'ejs');

// bayonet sdk
var bayonet = require('..');

// demo
app.get('/', function (req, res) {
    res.render('index', {
        consulting: JSON.stringify(fx.requests.consulting),
        feedback: JSON.stringify(fx.requests.feedback),
        feedback_historical: JSON.stringify(fx.requests.feedback_historical)
    });
});

// consulting
var addApi = function(api) { 
    app.post('/' + api, function (req, res) {
        bayonet.configure({
            version: 1,
            api_key: req.get('token')
        });

        bayonet.api[api](
            req.body
        ).then(function (r) {
            res.send(r);
        }).catch(function (r) {
            res.send(r.error);
        });
    });
};

addApi('consulting');
addApi('feedback');
addApi('feedback_historical');

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
