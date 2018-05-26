const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';

exports.auth = function(req, res){
  if(req.session.authorazed){
  res.render("driverList",{});
  }else{
  res.render('dispatcherAuth',{});
  }
}

exports.drivers = function(req, res){
  var query = "select * from Dispatchers where login='"+req.body.login+"' and password='"+req.body.password+"'";
  sql.open(conString, function(err, con){
      if(err){
          console.log('failed to open '+err.message);
          return;
      }
      var d = new Date();
      con.query(query, function (err, rows) {
        if (err) {
          console.log(err.message);
          return;
        }
        var elapsed = new Date() - d;
        console.log('rows.length ' + rows.length + ' elapsed ' + elapsed);
        console.log(rows);
      if(rows.length>0){
      req.session.username = req.body.login;
      req.session.authorazed = true;
      res.send({status:"OK"});
    }else{
      res.send(401, "Ошибка доступа!");
    }});
  });
}