
/*
 * GET home page.
 */

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
