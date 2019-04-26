const express = require('express');
const app = express();
var path = require('path');
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

var db;
var mongo_client = require('mongodb').MongoClient;

mongo_client.connect('mongodb://localhost:27017/survey', function (err, client) {
  if (err) throw err;
  db = client.db('survey');
});

app.get('/', function (req, res) { res.sendFile('public/index.html', {root: __dirname}) });

app.get('/chart', function (req, res)  { res.sendFile('public/chart.html', {root: __dirname}) });

app.get('/survey', function (req, res) { res.sendFile('public/survey.html', {root: __dirname}) });

app.post('/response', function (req, res) {
  //console.log(req.body);
  // console.log("Age: " + req.body.age);
  // console.log("Sex: " + req.body.sex);
  // console.log("Q1: " + req.body.Q1);
  // console.log("Q6: " + req.body.Q6);
  var ip = req.ip || "";

  db.collection("responses").insertOne({
    "ip": ip,
    "age": req.body.age,
    "sex": req.body.sex,
    "Q1": req.body.Q1,
    "Q2": req.body.Q2,
    "Q3": req.body.Q3,
    "Q4": req.body.Q4,
    "Q5": req.body.Q5,
    "Q6": req.body.Q6
  });
  res.send("Received");
});

app.listen(port, function() { console.log(`Example app listening on port ${port}!`) });
