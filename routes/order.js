const sql = require('msnodesqlv8');
const googleMapsClient = require('@google/maps').createClient({
key:'AIzaSyBFYTDI_36YLdfgadX1NrePYwItWuR8Lvc'
});
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
exports.answer = function(req, res){
  console.log('Ага, пришел запрос');
    if(!req.body){return res.sendStatus(400);}
    if(req.body.prepare){
      var query = "select min_price, km_price from Rates where ID_Rate="+req.body.data['rate'];
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
          res.send({min_price:rows[0].min_price, km_price:rows[0].km_price});
      });
    });
    }else if(req.body.order){
      var query = "insert into Orders (Client_Phone, ID_Rate, From_Address, Entrance, To_Address, Arrival_Time, Price, Payment_Type, State, Paid, Comment) values("+req.body.data["clientPhone"]+", "+req.body.data["rate"]+", "+req.body.data["fromAddress"]+", 1, "+req.body.data["toAddress"]+", "+req.body.data["arrivalTime"]+", "+price+", 0, 'В обработке', 0, "+req.body.data["comment"]+")";
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
          res.send({min_price:rows[0].min_price, km_price:rows[0].km_price});
      });
    });
    }
    /*
    console.log('Так-с, так-с. Тут что-то есть\n');
    console.log(req.body.origin+'\n'+req.body.destination+'\n'+req.body.travelMode);
    googleMapsClient.directions({
      origin:req.body.origin,
      destination:req.body.destination,
      mode:req.body.travelMode,
      language:'ru'
    }, function(err, data){
      if(!err){
        console.log(data);
      res.send(data);}
    })
   /* var query = "insert into Orders (Client_phone, From_Address, To_Address) values('"+req.body['phone']+"', '"+req.body['start']+"','"+req.body['end']+"')";
    //var query = "select * from Student";
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
      });
    });*/
  };