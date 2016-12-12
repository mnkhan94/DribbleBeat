const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const pug = require('pug');
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var db
var ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://mnkhan:testing_password@ds119578.mlab.com:19578/dribblebeat-1', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.handlebars', {games: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Saved to database')
    res.redirect('/')
  })
})

app.delete('/quotes', (req, res) => {
  console.log(req.body.id)
  db.collection('quotes').remove( {_id: ObjectID(req.body.id)},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('The Game was deleted')
  })
})