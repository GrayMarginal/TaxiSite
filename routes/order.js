const sql = require('msnodesqlv8');
const googleMapsClient = require('@google/maps').createClient({
key:'AIzaSyBFYTDI_36YLdfgadX1NrePYwItWuR8Lvc'
});
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
exports.answer = function(req, res){
  console.log(req.body);
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
		  
		  con.query("select Name, Price from Add_Services", function (err, additional) {
          if (err) {
            console.log(err.message);
            return;
          }
		  var additionalPrice = 0;
		  console.log(additional);
		  if(req.body.data["services"]){
		  for(var i = 0; i< additional.length;i++){
		  if(req.body.data["services"][additional[i].Name]=='true'){additionalPrice+=additional[i].Price;}
		  }}
		  res.set("Access-Control-Allow-Origin","*");
          res.send({min_price:rows[0].min_price, km_price:rows[0].km_price, servicesPrice:additionalPrice});
		   });
		  
      });
    });
    }
    if(req.body.order){
      var query = "insert into Orders (Client_Phone, ID_Rate, From_Address, Entrance, To_Address, Arrival_Time, Distance, Price, Payment_Type, State, Paid, Comment) values('"+req.body.data["clientPhone"]+"', "+req.body.data["rate"]+", '"+req.body.data["fromAddress"]+"',"+req.body.data["entrance"]+", '"+req.body.data["toAddress"]+"', '"+req.body.data["arrivalTime"]+"', "+req.body.data["distance"]+", "+req.body.data["price"]+", '"+req.body.data["payment"]+"', 'В обработке', '"+req.body.data["payment"]+"', '"+req.body.data["comment"]+"')";
      console.log(query);
    sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
        }
        con.query("select * from Clients where Phone_Number = "+req.body.data["clientPhone"], function (err, clients) {
          if (err) {
            console.log(err.message);
            return;
          }else{
            console.log("Rows:"+clients.length);
            console.log(clients);
          }
          if(clients.length==0){
            con.query("insert into Clients (Phone_Number, Discount) values("+req.body.data["clientPhone"]+", 0)", function (err, rows) {
              if (err) {
                console.log(err.message);
                return;
              }
          });
          }
          con.query(query, function (err, rows) {
            if (err) {
              console.log(err.message);
              return;
            }
			res.set("Access-Control-Allow-Origin","*");
            res.send({message:'Заказ оформлен!'});
        });
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