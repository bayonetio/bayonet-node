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
var apis = ['consulting', 'feedback', 'feedback_historical']

// demo
app.get('/', function (req, res) {
    var data = {};
    for(var i in apis)
        data[apis[i]] = JSON.stringify(fx.requests[apis[i]]);

    res.render('index', data);
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

for(var i in apis)
    addApi(apis[i]);

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
