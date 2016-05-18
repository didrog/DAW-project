var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');
    jwt = require('jsonwebtoken');//token

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());
app.use(express.static('app'));


var router = express.Router();

//token y modelo
var port = process.env.PORT || 3001;
var User = require('./models/usuarios');


//cargamos el archivo de rutas
require('./routes')(app);
app.use(router);

//si se produce un error al arrancar lo capturamos y mostramos
process.on('uncaughtException', function(err) {
  console.log(err);
});

mongoose.connect('mongodb://localhost/usuarios', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
