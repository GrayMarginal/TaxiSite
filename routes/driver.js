const sql = require('msnodesqlv8');
var SMSru = require('sms_ru');
var sms = new SMSru("4E2B56A5-56F3-F21A-3677-5F060E907A84");
const crypto = require('crypto');
var rand = "AASCJ";
const conString = 'Driver={SQL server Native Client 10.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';

exports.answer = function(req, res){
	if(req.body.auth){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        var q = "select * from Drivers where Phone_Number = '"+req.body.phone+"' and (Password = '"+req.body.password+"' or Password is null)";
        console.log(q);
        con.query( q, function (err, drivers) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log(drivers);
        if(clients.length>0){
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
        }else{
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"FAILED"});
        }
      });
    });
	}
}