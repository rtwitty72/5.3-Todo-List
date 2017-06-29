const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');



app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());


app.get("/todo", function (req, res) {

  var todos = {todos:[
    'Wash the car', 'Take out trash', 'Feed the Dog','Check Email'
  ]};

  res.render('index', todos);
});

app.listen(3000, function(req, res){
  console.log('Application has been initilized.');

});
