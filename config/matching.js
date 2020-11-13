const sqlite3 = require('sqlite3').verbose()
const matching = function (email1) {
    const DB = new sqlite3.Database("./workers.db", function(err){
        if (err){
            console.log(err);
            return;
        }
        console.log("Connected to " + "./workers.db" + " database. Will check if user exists ...");
    });
    var sql = "SELECT looking FROM Newimproved WHERE email = ? ";
    var search = null
    const tmp_func = DB.get(sql, [email1], function(err,row) {
        if (err) {
            console.log(err);
        } else {
            search = row
            return row
        }
    });
    console.log("Yahooo",search)
}
module.exports = matching