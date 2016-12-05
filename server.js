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