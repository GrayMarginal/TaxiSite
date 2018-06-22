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
        if(drivers.length>0){
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
        }else{
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"FAILED"});
        }
      });
    });
	}else if(req.body.orders){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        var q = "SELECT dbo.Orders.ID_Order, dbo.Orders.Client_Phone, dbo.Orders.From_Address, dbo.Orders.Entrance, dbo.Orders.To_Address, dbo.Orders.Arrival_Time, dbo.Orders.Price, dbo.Orders.Payment_Type, dbo.Orders.State, dbo.Orders.Paid, dbo.Orders.Mark, dbo.Orders.Comment FROM dbo.Add_Services INNER JOIN dbo.Order_Add_Services ON dbo.Add_Services.ID_Add_Service = dbo.Order_Add_Services.ID_Add_Service RIGHT OUTER JOIN dbo.Orders ON dbo.Order_Add_Services.ID_Order = dbo.Orders.ID_Order WHERE (dbo.Orders.ID_Rate = (SELECT ID_Rate FROM dbo.Drivers WHERE (Phone_Number = '"+req.body.phone+"'))) AND (dbo.Orders.State = 'В обработке') AND (dbo.Orders.ID_Driver IS NULL)";
        console.log(q);
        con.query( q, function (err, order) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log(order);
        if(order.length>0){
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK", orders:order})
        }else{
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"FAILED"});
        }
      });
    });
	}else if(req.body.accept){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
		//(select ID_Driver from Drivers where Phone_Number = '"+req.body.phone+"')
		con.query( "select ID_Driver from Drivers where Phone_Number = '"+req.body.phone+"'", function (err, drivers) {
          if (err) {
            console.log(err.message);
            return;
          }
		  console.log(drivers);
        con.query( "update Orders set State = 'Принят', ID_Driver ="+drivers[0].ID_Driver+"where ID_Order = "+req.body.ID_Order, function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
	  con.query( "update Drivers set Status = 'busy' where ID_Driver ="+drivers[0].ID_Driver, function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
      });
	  res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
      });
	  });
    });
	}else if(req.body.acceptedOrder){
		console.log(req.body);
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
		con.query( "select ID_Driver from Drivers where Phone_Number = '"+req.body.phone+"'", function (err, drivers) {
          if (err) {
            console.log(err.message);
            return;
          }
        con.query( "select * from Orders where ID_Driver = "+drivers[0].ID_Driver+" and State<>'Завершен' and State<>'В обработке'", function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
		  if(rows.length>0){
			  con.query( "update Drivers set Status = 'busy' where ID_Driver ="+drivers[0].ID_Driver, function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
      });
		  }
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK", order:rows})
		});
		});
    });
	}else if(req.body.changeStatus){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        con.query( "update Orders set State ='"+req.body.status+"' where ID_Order="+req.body.ID_Order, function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
		  if(req.body.status=="На месте"){
			  con.query( "SELECT Client_Phone from Orders where ID_Order="+req.body.ID_Order, function (err, clientPhone) {
          if (err) {
            console.log(err.message);
            return;
          }
			sms.sms_send({
				to:clientPhone[0].Client_Phone,
				text:"OAT-TAXI.TK \n Водитель прибыл. "+DriverInfo[0].Car_Description+" "+DriverInfo[0].Car_Number
				}, function(e){
					req.session.sended=true;
				});
		  });
			  
		  }
		  con.query( "update Drivers set Status ='free' where Phone_Number="+req.body.phone, function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
		  });
		});
		});
	}else if(req.body.paymentConfirm){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        con.query( "update Orders set Paid ='"+req.body.Paid+"' where ID_Order="+req.body.ID_Order, function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
		});
		});
	}else if(req.body.driverStatus){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
		con.query( "select Status from Drivers where Phone_Number = '"+req.body.phone+"'", function (err, drivers) {
          if (err) {
            console.log(err.message);
            return;
          }
		  if(drivers[0].Status!="busy"){
		con.query( "update Drivers set Status = '"+req.body.status+"' where Phone_Number = '"+req.body.phone+"'", function (err, drivers) {
          if (err) {
            console.log(err.message);
            return;
          }
		  res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
		  });}else{
			  res.set("Access-Control-Allow-Origin","*");
          res.send({status:"FAILED", message:"Вы не можете изменить статус во время поездки"});
		  }
		});
		});
	}else if(req.body.changePass){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        con.query( "select * from Drivers where Phone_Number ='"+req.body.phone+"'", function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
		  if(rows[0].Password==req.body.curPass){
			  con.query( "update Drivers set Password = '"+req.body.newPass+"' where Phone_Number = '"+req.body.phone+"'", function (err, drivers) {
          if (err) {
            console.log(err.message);
            return;
          }
		  res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
		  });
		  }else{
			  res.set("Access-Control-Allow-Origin","*");
          res.send({status:"FAILED", message:"Текущий пароль не совпадает"})
		  }
		});
		});
	}
}
/*
else if(req.body.orderComplete){
		sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
            return;
        }
        con.query( "update Orders set State ='Завершен' where ID_Order="+req.body.ID_Order, function (err, rows) {
          if (err) {
            console.log(err.message);
            return;
          }
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"OK"})
		});
		});
	}*/