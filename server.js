const express = require('express');

const app = express();
const MongoClient = require('mongodb').MongoClient
const pug = require('pug');

app.set('view engine', 'pug')
app.use(express.static('public'))

