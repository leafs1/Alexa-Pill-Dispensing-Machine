const express = require('express')
const app = express()
const fs = require('fs');
var data = null;
app.get('/givePill', function(req,res){
  res.send(data);
  data = null;
})
app.get('/getPill', function(req,res){
  pill = req.query.pill
  console.log(req.query);
  data = pill;
  res.send(pill);
})
app.listen(3000, () => console.log('Server running on port 3000'))
