const sqlite3 = require('sqlite3').verbose()
const check_if_in_db = function (email1,password1) {
    const DB = new sqlite3.Database("./workers.db", function(err){
        if (err){
            console.log(err);
            return;
        }
        console.log("Connected to " + "./workers.db" + " database. Will check if user exists ...");
    });
    var sql = "SELECT email password FROM Newimproved WHERE email = ? AND password = ? ";
    const tmp_func = DB.get(sql, [email1,password1], function(err,row) {
        if (err) {
            console.log(err);
        } else {
            callback(row)
        }
    });
    console.log("Yahooooooooooooo" , search)
    if (search){
        return true
    }
    else{
        return false
    }
}
module.exports = check_if_in_db
