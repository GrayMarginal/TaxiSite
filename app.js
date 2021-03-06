
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var order = require('./routes/order');
var mobile = require('./routes/mobile');
var driver = require('./routes/driver');
var dispatcher = require('./routes/dispatcher');
var driverList = require('./routes/driverList');
var https = require('https');
var http = require('http');
var path = require('path');
const sql = require('msnodesqlv8');
var fs = require('fs');
const crypto = require('crypto');
var SMSru = require('sms_ru');
var sms = new SMSru("4E2B56A5-56F3-F21A-3677-5F060E907A84");
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
app.use(express.session({
  secret:"Who killed Kenny?"
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//var urlencodedParser = express.bodyParser.urlencodedParser({extended: false});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/profile', user.profile);
app.post('/profile', user.profile);
app.get('/reg', user.registration);
app.post('/reg', user.registration);
app.get('/about', routes.about);
app.get('/tariffs', routes.tariffs);
app.get('/contacts', routes.contacts);
//app.get('/login', routes.login);
app.get('/update', routes.update);
app.post('/order', order.answer);
app.post('/mobile', mobile.answer);
app.get('/mobile', mobile.answer);
app.post('/driver', driver.answer);
app.get('/driver', driver.answer);
app.get('/dispatcher', dispatcher.auth);
app.post('/dispatcher', dispatcher.drivers);
app.post('/driverList', driverList.List);
app.get('/driverList',driverList.List);
app.get('/dispatcherorder', function(req, res){res.render('dispatcherOrder', {title:"Заказ"});})

http.createServer(app).listen(app.get('port'), function(){
  console.log('http server listening on port ' + app.get('port')+'. Time:'+new Date().getHours()+':'+new Date().getMinutes());
});
/*https.createServer(options, app).listen(443, function(){
  console.log('https server listening on port ' + 443);
});*/
