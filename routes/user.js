const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 10.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';

exports.profile = function(req, res){
	  if(req.session.authorazed==true&&req.session.role=='client'&&req.session.login){
      if(req.body.exit){
        req.session.destroy();
        res.render('login', {title:'Вход', login:'Вход'});
      }else{
	var query = "select Address, Name from Client_Addresses where Client_Phone='"+req.session.login+"'";
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
	  console.log(rows+req.session.login);
	  	 res.render("profile", {phone:req.session.login});
	  });
  });
	  }}else{
	  if(req.method=="GET"){
		res.render('login', {title:'Вход', login:'Вход'});
		}else{
      sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        var d = new Date();
        var q = "select * from Clients where Phone_Number = '"+req.body.login+"' and (Password = '"+req.body.password+"' or Password is null)";
        console.log(q);
        con.query( q, function (err, clients) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log(clients);
        if(clients.length>0){
          req.session.authorazed=true;
          req.session.login = req.body.login;
          req.session.role = 'client';
          res.send({status:"OK"})
        }else{
          res.send(403);
        }
      });
    });
}
  }
  }