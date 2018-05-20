
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.about = function(req, res){
res.render('about', {title:'О нас', about:'Мы предоставляем качественные услуги в сфере такси'});
};
