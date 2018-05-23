
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var order = require('./routes/order');
var https = require('https');
var http = require('http');
var path = require('path');
const sql = require('msnodesqlv8');
var fs = require('fs');
var options = {
  key: fs.readFileSync('fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('fixtures/keys/agent2-cert.pem')
};
var app = express();
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
// all environments
//app.set('port', process.env.PORT || 3000);
app.set('port', process.env.PORT || 80);
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//var urlencodedParser = express.bodyParser.urlencodedParser({extended: false});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', routes.about);
app.get('/tariffs', routes.tariffs);
app.get('/contacts', routes.contacts);
app.get('/login', routes.login);
app.get('/update', routes.update);
app.post('/order', order.answer);

http.createServer(app).listen(app.get('port'), function(){
  console.log('http server listening on port ' + app.get('port'));
});
/*https.createServer(options, app).listen(443, function(){
  console.log('https server listening on port ' + 443);
});*/
