
/*
 * GET home page.
 */
 
 function iplogger(req){
	 var now = new Date();
	 console.log(now.getDate()+'.'+now.getMonth()+'.'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds());
	 console.log('ip:'+
	 req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null));
	 console.log('via:'+req.headers['via']);
	 console.log('user-agent:'+req.headers['user-agent']);
 }
const exec = require('child_process').exec;
exports.index = function(req, res){
	iplogger(req);
  res.render('index', { title: 'Express' });
};

exports.about = function(req, res){
	iplogger(req);
res.render('about', {title:'О нас', about:'Мы предоставляем качественные услуги в сфере такси'});
};

exports.contacts = function(req, res){
	iplogger(req);
res.render('contacts', {title:'Контакты', contacts:'Наши контакты'});
};

exports.tariffs = function(req, res){
	iplogger(req);
res.render('tariffs', {title:'Тарифы', tariffs:'Наши тарифы'});
};

exports.login = function(req, res){
iplogger(req);
};

exports.update = function(req, res){
	iplogger(req);
exec('git pull', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
	res.end('ERROR');
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
res.end('succesfull');
}
