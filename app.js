'use strict';

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

let todoIdx = 0;
let context = {
 todos: [
   'Wash the car', 'Take out trash', 'Feed the Dog', 'Check Email'
 ],
 todoId: function() {
   return todoIdx++;
 },
 completedTodos: ['Made the bed'],
 completedId: function(){
   return todoIdx++;
 }
};

app.get("/", function (req, res) {
  res.render('index', context);
});

app.post('/', (req, res) => {
  var todos = context.todos;
  todos.push(req.body.newTodo);
  res.redirect('/');
});

app.listen(3000, function(req, res){
  console.log('Application has been initilized.');

});
