const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 10.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';

exports.profile = function(req, res){
	  if(req.session.authorazed==true){
	var query = "select Address, Name from Client_Addresses where Client_Phone='"+req.session.phone+"'";
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
	  console.log(rows+req.session.phone);
	  	 res.render("profile", {phone:req.session.phone, addresses:rows.address, names:rows.name});
	  });
  });
	  }else{
	  if(req.method=="GET"){
		res.render('login', {title:'Вход', login:'Вход'});
		}else{
		req.session.authorazed=true;
		req.session.login = req.body.phone;
		res.send({status:"OK"})
}
  }
  }