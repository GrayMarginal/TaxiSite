const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';

exports.auth = function(req, res){
	res.render('dispatcherAuth',{});
}

exports.drivers = function(req, res){
	var query = "select * from Dispatchers where login='"+req.body.login+"' and password='"+req.body.password+"'";
    sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
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
		  con.query("select * from Drivers", function (err, driverList) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log(driverList);
          res.send({status:'OK', list:driverList});
        });
      }else{
			  res.send(401, "Ошибка доступа!");
		  }
      });
	});
}