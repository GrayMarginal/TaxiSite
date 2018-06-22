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
            sql.open(conString, function(err, con){
                if(err){
                    console.log('failed to open '+err.message);
                }
                con.query("insert into Drivers (LastName, FirstName, Patronymic, Phone_Number, Password, Car_Number, Car_Description, Status, ID_Rate) VALUES('"+req.body.LastName+"', '"+req.body.FirstName+"', '"+req.body.Patronymic+"', '"+req.body.Phone_Number+"', '"+req.body.Password+"', '"+req.body.Car_Number+"', '"+req.body.Car_Description+"', '"+req.body.Status+"', "+req.body.ID_Rate+")", function (err, result) {
                    if (err) {
                    console.log(err.message);
                    res.send({status:"ERROR"});
                    return;
                    }
                //          console.log(driverList);
                    res.send({status:'OK', result:result});
                });
            });}
           // res.send();
        else{
            if(req.method=="GET"){
                res.render("driverList",{});
            }

sql.open(conString, function(err, con){
    if(err){
        console.log('failed to open '+err.message);
        res.send({status:"ERROR"});
    }
    con.query("select * from Drivers", function (err, driverList) {
        if (err) {
        console.log(err.message);
        res.send({status:"ERROR"});
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
            res.send({status:"ERROR"});
        }else{
        var d = new Date();
        con.query(query, function (err, rows) {
            if (err) {
            console.log(err.message);
            console.log(query);
            res.send({status:"ERROR"});
            return;
            }else{
                
            }
        //          console.log(driverList);
            
        });
    }
    });
    }