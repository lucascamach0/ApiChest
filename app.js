var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var admin  = require('firebase-admin');
var firebase = require("firebase");

var serviceAccount = require("./serviceAccountKey.json");

var config = {
    apiKey: "AIzaSyCUjgzKLHS68jq1DotRTDIRHbsM1uPmTAI",
    authDomain: "chest-12531.firebaseapp.com",
    databaseURL: "https://chest-12531.firebaseio.com",
    projectId: "chest-12531",
    storageBucket: "chest-12531.appspot.com",
    messagingSenderId: "781771358211",
    credential: admin.credential.cert(serviceAccount),
  };
  var admin = admin.initializeApp(config);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app,admin);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});


