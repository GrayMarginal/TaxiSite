const sql = require('msnodesqlv8');
const googleMapsClient = require('@google/maps').createClient({
key:'AIzaSyBFYTDI_36YLdfgadX1NrePYwItWuR8Lvc'
});
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
exports.answer = function(req, res){
  console.log('Ага, пришел запрос');
    if(!req.body){return res.sendStatus(400);}
    console.log('Так-с, так-с. Тут что-то есть\n');
    console.log(req.body.origins+'\n'+req.body.destinations+'\n'+req.body.travelMode);
/*     googleMapsClient.distanceMatrix({
      origins:req.body.origins,
      destinations:req.body.destinations,
      mode:req.body.travelMode,
      language:'ru'
    }, function(err, data){
      if(!err){
        console.log(data);
      res.send(data);}
    }); */
    googleMapsClient.directions({
      origin:req.body.origins,
      destination:req.body.destinations,
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