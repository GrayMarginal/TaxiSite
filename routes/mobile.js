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
        var q = "select * from Clients where Phone_Number = '"+req.body.phone+"' and (Password = '"+req.body.password+"' or Password is null)";
        console.log(q);
        con.query( q, function (err, clients) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log(clients);
        if(clients.length>0){
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
        }else{
			res.set("Access-Control-Allow-Origin","*");
          res.send(403);
        }
      });
    });
	}else if(req.body.history){
        sql.open(conString, function(err, con){
          if(err){
              console.log('failed to open '+err.message);
              return;
          }
          var his = "SELECT dbo.Clients.Phone_Number, dbo.Orders.From_Address, dbo.Orders.To_Address, dbo.Orders.Arrival_Time, dbo.Orders.Price, dbo.Rates.Name, dbo.Drivers.LastName + ' ' + LEFT(dbo.Drivers.FirstName, 1) + '.' + LEFT(dbo.Drivers.Patronymic, 1) + '.' AS Driver, dbo.Drivers.Car_Description + ' ' + dbo.Drivers.Car_Number AS Car, dbo.Orders.Mark FROM dbo.Clients INNER JOIN dbo.Orders ON dbo.Clients.Phone_Number = dbo.Orders.Client_Phone INNER JOIN dbo.Rates ON dbo.Orders.ID_Rate = dbo.Rates.ID_Rate INNER JOIN dbo.Drivers ON dbo.Orders.ID_Driver = dbo.Drivers.ID_Driver AND dbo.Rates.ID_Rate = dbo.Drivers.ID_Rate WHERE     (dbo.Clients.Phone_Number = '"+req.body.phone+"')";
          con.query(his, function (err, story) {
            if (err) {
              console.log(err.message);
              return;
        }
          console.log(story);
		  res.set("Access-Control-Allow-Origin","*");
           res.send({history:story});
        });
      });
      }else if(req.body.favorites){
		  sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        var q = "select * from Client_Addresses where Client_Number = '"+req.body.phone+"'";
        console.log(q);
        con.query( q, function (err, addresses) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log(addresses);
        if(addresses.length>0){
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK", address:addresses});
        }else{
			res.set("Access-Control-Allow-Origin","*");
          res.send(403);
        }
      });
    });
	  }else{
		  res.send("Что ты тут делаешь?");
	  }
}