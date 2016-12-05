const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const pug = require('pug');

app.set('view engine', 'pug')
app.use(express.static('public'))

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
  db.collection('games').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('layout.pug', {games: result})
  })
})

app.post('/games', (req, res) => {
  db.collection('games').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
