const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars') // view engine or template engine, wraps pages in a certain template
const morgan = require('morgan')  // makes stuff verbose down on the cmd line
const path = require('path')
const create_table = require('./config/create_table')
//Load config
dotenv.config({ path: './config/config.env' }) //All global vars in config.env

// Start the DB and Create a Table
DB = connectDB()
create_table(DB)
DB.close()

const app = express() //initialize app

//body parser
app.use(express.urlencoded({ extended: false}))

app.use(morgan('dev'))  // Puts everything in console , like HTTP requests etc.

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine','.hbs')

// Static Folder for images and stuff like that
app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/', require('./routes/index'))  // Telling application to use the routes specified in index.js file

const PORT = process.env.PORT //process.env lets us access GV

app.listen(PORT,console.log(`Server running on port ${PORT}`))