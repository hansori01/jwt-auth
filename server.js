require('dotenv').config();
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
app.use(express.json());

const posts = [
  {
    username: 'Sori',
    title: 'Post1'
  },
  {
    username: 'Jim',
    title: 'Post2'
  }
  
]
app.get('/posts', (req, res) => {
  res.json(posts)
})

app.post('/login', (req, res) => {
  // Authenticate User is implicit

  const username = req.body.username;
  const user = {name: username};

  // takes in a paylod to serialize, and a secret
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

  res.json({accessToken})
})
app.listen(4000);