
/*
 * GET home page.
 */
const exec = require('child_process').exec;
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.about = function(req, res){
res.render('about', {title:'О нас', about:'Мы предоставляем качественные услуги в сфере такси'});
};

exports.contacts = function(req, res){
res.render('contacts', {title:'Контакты', contacts:'Наши контакты'});
};

exports.tariffs = function(req, res){
res.render('tariffs', {title:'Тарифы', tariffs:'Наши тарифы'});
};

exports.login = function(req, res){
res.render('login', {title:'Вход', tariffs:'Вход'});
};

exports.update = function(req, res){
	
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
