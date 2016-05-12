var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ extended: true }));
/*app.get('/endpoint', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';
	
	console.log('params: ' + JSON.stringify(req.params));
	console.log('body: ' + JSON.stringify(req.body));
	console.log('query: ' + JSON.stringify(req.query));
	
	res.header('Content-type','application/json');
	res.header('Charset','utf8');
	res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
});*/

app.post('/endpoint', function(req, res){
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});


app.listen(3000, function(){
var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
});


