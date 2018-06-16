const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 10.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
exports.List = function(req, res){

    if(req.session.authorazed&&req.session.role!='client'){
        if(req.body.exit){
            req.session.destroy();
            res.send({status:'OK'});
        }else if(req.body.save){
            save(req.body.data);
            res.send(true);
        }else if(req.body.add){
           // res.send();
        }else{
            if(req.method=="GET"){
                res.render("driverList",{});
            }

sql.open(conString, function(err, con){
    if(err){
        console.log('failed to open '+err.message);
    }
    var d = new Date();
    con.query("select * from Drivers", function (err, driverList) {
        if (err) {
        console.log(err.message);
        return;
        }
    //          console.log(driverList);
        res.send({status:'OK', list:driverList});
    });
});}
}else{
    res.render('dispatcherAuth',{});
}
}

function save(data){
    console.log(data);
    var query = "update Drivers set LastName = '"+data.LastName+"', FirstName = '"+data.FirstName+"', Patronymic = '"+data.Patronymic+"', Phone_Number = '"+data.Phone_Number+"', Password = '"+data.Password+"', Car_Number = '"+data.Car_Number+"', Car_Description = '"+data.Car_Description+"', Status = '"+data.Status+"', ID_Rate = "+data.ID_Rate+" where ID_Driver = "+data.ID_Driver;
    sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
        }else{
        var d = new Date();
        con.query(query, function (err, rows) {
            if (err) {
            console.log(err.message);
            console.log(query);
            return;
            }else{
                
            }
        //          console.log(driverList);
            
        });
    }
    });
    }

function add(data){
    var query = "insert into Drivers";
    sql.open(conString, function(err, con){
        if(err){
            console.log('failed to open '+err.message);
        }else{
        var d = new Date();
        con.query(query, function (err, rows) {
            if (err) {
            console.log(err.message);
            console.log(query);
            return;
            }else{
                
            }
        //          console.log(driverList);
            
        });
    }
    });
}