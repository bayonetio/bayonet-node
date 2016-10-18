// express configuration
var express = require('express');
var app = express();

// serve public folder
app.use(express.static(__dirname + '/public'));

// bayonet sdk
var bayonet = require('..');
bayonet.configure({
    version: 1,
    api_key: process.env.BAYONET_API_KEY
});

// consult
app.get('/consult', function (req, res) {
  res.send('consult');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});