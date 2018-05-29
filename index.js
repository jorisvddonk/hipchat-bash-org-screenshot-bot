var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(port);

app.get('/hello', function (req, res) {
    res.send({'qs': req.query});
});

console.log('Server started on: ' + port);