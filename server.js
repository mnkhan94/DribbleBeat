const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const pug = require('pug');
const exphbs  = require('express-handlebars');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');


require('./config/passport')(passport); // pass passport for configuration


// set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)

    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(express.static('public'))

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

// required for passport
    app.use(session({ secret: 'session_secret' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

// Database ====================================================================
    var configDB = require('./config/database.js');

// configuration ===============================================================
    mongoose.connect(configDB.url); // connect to our database

// routes ======================================================================
    require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


var db
var ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://mnkhan:testing_password@ds119578.mlab.com:19578/dribblebeat-1', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


// app.delete('/games', (req, res) => {
//   console.log(req.body.id)
//   db.collection('games').remove( {_id: ObjectID(req.body.id)},
//   (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('The Game was deleted')
//   })
// })