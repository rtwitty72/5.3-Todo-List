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

let todos = ['Wash the car', 'Take out trash', 'Feed the Dog', 'Check Email', 'Make the bed'];
let completedTodos = [];

// reder todos & completed todos to the DOM
app.get("/", function (req, res) {
  let idx = 0;
  let completedIdx = 0;
  let context = {
    todos: todos,
    completedTodos: completedTodos,
    id: function() {
      return idx++;
    },
    completedId: function() {
      return completedIdx++;
    }
  };
  console.log('context', context);
  res.render('index', context);
});

// adds a new todo
app.post('/', (req, res) => {
  todos.push(req.body.newTodo);
  res.redirect('/');
});

// mark a todo complete
app.post('/complete/:id', (req, res)=>{
  let index = req.params.id;
  // grab the individual todo from the todos array
  let todo = todos[index];
  // remove the individual todo from the todos array using splice method
  todos.splice(index, 1);
  // add individual todo to the completed todos array
  completedTodos.push(todo);
  res.redirect('/');
});

// delete a todo
app.post('/delete/:id', (req, res)=>{
  let index = req.params.id;
  completedTodos.splice(index, 1);
  res.redirect('/');
});

app.listen(3000, function(req, res){
  console.log('Application has been initilized.');

});
