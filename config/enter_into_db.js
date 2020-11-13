const sqlite3 = require('sqlite3').verbose()
const enter_into_db = function register(fname,lname,email,password,skills,looking) {
    const DB = new sqlite3.Database("./workers.db", function(err){
        if (err){
            console.log(err);
            return;
        }
        console.log("Connected to " + "./workers.db" + " database. Will add entries now... enter into table func");
    });
    var sql = "INSERT INTO Newimproved (fname , lname , email , password , skills , looking) ";
    sql += "VALUES (? ,?, ?, ? , ? , ?) ";

    DB.run(sql, [fname,lname,email,password,skills,looking], function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Last ID: " + this.lastID);
            console.log("# of Row Changes: " + this.changes);
        }
    });
}
module.exports = enter_into_db