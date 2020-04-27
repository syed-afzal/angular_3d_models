const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();
app.use(favicon(__dirname + '/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/dist/three3d')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});

// this is for delivering app on heroku
console.log(path.join(__dirname, '/dist/three3d/index.html'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/three3d/'));
});
app.listen(port, () => {
  console.log("Server is up on port", port)
});
