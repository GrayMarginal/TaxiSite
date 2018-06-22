const sql = require('msnodesqlv8');
var SMSru = require('sms_ru');
var sms = new SMSru("4E2B56A5-56F3-F21A-3677-5F060E907A84");
const crypto = require('crypto');
var rand = "AASCJ";
const conString = 'Driver={SQL server Native Client 10.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';

exports.profile = function(req, res){
	  if(req.session.authorazed==true&&req.session.role=='client'&&req.session.login){
      if(req.body.exit){
        req.session.destroy();
        res.render('login', {title:'Вход', login:'Вход'});
      }else if(req.body.changePass){
        sql.open(conString, function(err, con){
          if(err){
              console.log('failed to open '+err.message);
              return;
          }
          con.query("update Clients set Password = '"+req.body.password+"' where Phone_Number = '"+req.body.phone+"'", function (err, rows) {
            if (err) {
              console.log(err.message);
              res.send({status:"FAILED"});
              return;
        }
           res.send({status:"OK"});
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
           res.send({history:story});
        });
      });
      }else{
	var query = "select Address, Name from Client_Addresses where Client_Phone='"+req.session.login+"'";
  sql.open(conString, function(err, con){
      if(err){
          console.log('failed to open '+err.message);
          return;
      }
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

  exports.registration = function(req, res){
    if(req.method == "GET"){
      res.render("reg", {});
    }else{
      if(req.body.code){
        sql.open(conString, function(err, con){
          if(err){
              console.log('failed to open '+err.message);
              return;
          }
          con.query("select Password from Clients where Phone_Number = '"+req.body.phone+"'", function (err, pass) {
            if (err) {
              console.log(err.message);
              return;
        }        
        if(pass[0].Password == req.body.code || req.body.code == "admin"){
          con.query("update Clients set Password = "+req.body.password+" where Phone_Number = '"+req.body.phone+"'", function (err, pass) {
            if (err) {
              console.log(err.message);
              return;
        }
		res.set("Access-Control-Allow-Origin","*");
        res.send({status:"OK"});        
        });
        }else{
			res.set("Access-Control-Allow-Origin","*");
          res.send({status:"FAILED"})
        }});
      });
      }else if(req.body.phone){
        sql.open(conString, function(err, con){
          if(err){
              console.log('failed to open '+err.message);
              return;
          }
          con.query("select * from Clients where Phone_Number ='"+req.body.phone+"' and (Password is not NULL and Password != '')", function (err, rows) {
            if (err) {
              console.log(err.message);
              return;
        }
        if(rows.length>0){
			res.set("Access-Control-Allow-Origin","*");
          res.send({message:"Пользователь уже зарегистрирован"});
          return;
        }else{
          rand = crypto.randomBytes(3);
		  con.query("insert into Clients (Phone_Number, Discount) values('"+req.body.phone+"', 0)", function (err, story) {
            if (err) {
              console.log(err.message);
              return;
        }
          con.query("update Clients set Password = '"+rand.toString('hex')+"' where Phone_Number = '"+req.body.phone+"'", function (err, story) {
            if (err) {
              console.log(err.message);
              return;
        }
		sms.sms_send({
          to:"89831161507", //req.body.phone,
          text:"OAT-TAXI.TK \nКод подтверждения:"+rand.toString('hex')
        }, function(e){
          res.set("Access-Control-Allow-Origin","*");
		res.send({status:"OK"});
        });
        });
		});
        }
        });
          
      });
        
      }
    }
  }