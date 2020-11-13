const sqlite3 = require('sqlite3').verbose()

const connectDB = function(){
    const DB = new sqlite3.Database("./workers.db" , function(err){
	if (err){
		console.log(err);
		return;
	}
	console.log("Connected to " + process.env.DB_PATH + " database.");
})
return DB
}


module.exports = connectDB
