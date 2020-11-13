const sqlite3 = require('sqlite3').verbose()

dbSchema = `CREATE TABLE IF NOT EXISTS Newimproved (
	id integer NOT NULL PRIMARY KEY,
	fname text NOT NULL,
	lname text NOT NULL,
	email text NOT NULL,
	password text NOT NULL,
	skills text,
	looking text
);`

const create_table = function(DB){DB.exec(dbSchema, function(err){
    if (err) {
        console.log(err);
	}
	else{
		console.log("Newimproved Table has been made")
	}
});}

module.exports = create_table