require('dotenv').config();
const express = require('express');
const { sendStatus } = require('express/lib/response');
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
app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  // return undefined or the access token
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return sendStatus(403)
    req.user = user
    next()
  })
}


app.listen(4000);