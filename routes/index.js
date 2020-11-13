// Keep track of all routing.
const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const enter_into_db = require('../config/enter_into_db')
const check_if_in_db = require('../config/check_if_in_db')
const matching = require('../config/matching')
const sqlite3 = require('sqlite3').verbose()

// Landing page route , get '/' and send landing page info
router.get('/', (req,res) => {
    // this for text -> res.send('Login Or Signup')
    res.render('landing',{layout : 'login'})
})

// Login page
router.get('/login', (req,res) => {
    //res.send('Login')
    res.render('login' , {layout : 'login'})
})

router.get('/mymatches', (req,res) => {
    //res.send('Login')
    res.render('login' , {layout : 'login'})
})

// Signup page
router.get('/signup', (req,res) => {
    //res.send('signup')
    res.render('signup' , {layout:'login'})
})

// Route to either "You are not a valid user" or the main homefeed
//router.post('/homefeed', (req,res) => {
//   var form = new formidable.IncomingForm();
//    form.parse(req, function (err, fields, files) {
//        if(check_if_in_db(fields.email,fields.password)){
//            //matching(fields.email)
//            res.render("main")
//        }
//        else{
//            res.send("You are not a valid user")
//        }
//   })
//})

// Hacking together the login wrapped in DB
router.post('/homefeed', (req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const DB = new sqlite3.Database("./workers.db", function(err){
            if (err){
                console.log(err);
                return;
            }
            console.log("Connected to " + "./workers.db" + " database. Will check if user exists ...");
        });
        var sql = "SELECT email password FROM Newimproved WHERE email = ? AND password = ? ";
        DB.get(sql, [fields.email,fields.password], function(err,row) {
            if (err) {
                console.log(err);
            } else {
                if(row){
                    var sql = "SELECT looking FROM Newimproved WHERE email = ? ";
                    DB.get(sql, [fields.email], function(err,row) {
                        if (err) {
                            console.log(err);
                        } else {
                            var search = row.looking
                            console.log(search) //Math
                            var sql = "SELECT fname, email, skills FROM Newimproved WHERE skills = ? ";
                            DB.all(sql,[search],function(err,rows){
                                console.log(rows)
                                var list_of_matches = rows
                                res.render("main",{name:fields.email , list_of_matches})
                            })
                        }
                    });
                }
                else{
                    res.send("You are not a valid user")
                }
            }
        });
   })
})


// Dummy route to homefeed to see homefeed dev
router.get('/homefeed',(req,res) => {
    //var list_of_matches = {friends: [{name: "Austin"},{name: "Justin"}]}
    var list_of_matches = [{cookie: "Rich" , emi: "rich@google.com"},{cookie: "Ibrahim" , emi: "ibrahim@google.com"}]
    res.render("main" , { name : "Jeet" , list_of_matches})
})

// Route to main page so they can login
router.post('/', (req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        enter_into_db(fields.fname,fields.lname,fields.email,fields.password,fields.skills,fields.looking)
   })
   res.redirect('/')
})

module.exports = router