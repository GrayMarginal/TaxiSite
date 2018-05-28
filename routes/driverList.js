const sql = require('msnodesqlv8');
const conString = 'Driver={SQL server Native Client 10.0}; Server=(local); Database={Taxi}; Trusted_Connection=Yes;';
function save(date){
console.log(date.phone);
return true;
}
exports.List = function(req, res){
    if(req.session.authorazed){
        if(req.body.exit){
            req.session.destroy();
            res.send({status:'OK'});
        }else if(req.body.save){
            res.send(save(req.body.data));
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