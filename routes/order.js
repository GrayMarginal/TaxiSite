const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
exports.answer = function(req, res){
    if(!req.body){return res.sendStatus(400);}
    console.log(req.body);
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