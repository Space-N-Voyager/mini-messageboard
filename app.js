const express = require('express');
const app = express();
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index', {messages: messages});
});

app.get('/new', (req, res) => {
  res.render('form');
});

app.post('/new', (req, res) => {
  const { messageText, authorName } = req.body;
  messages.push({text: messageText, user: authorName, added: new Date()});
  res.redirect('/');
});

app.get('/message/:id', (req, res) => {
  const message = messages[req.params.id];
  if(!message) return res.status(404).send("Message not found");
  res.render('message', {message});
});

const PORT = 3000;

app.listen(PORT, () => console.log('Server running...'));