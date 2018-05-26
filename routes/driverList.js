const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 11.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
exports.List = function(req, res){
    if(req.session.authorazed){
        if(req.body.exit==true){
            req.session.destroy();
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