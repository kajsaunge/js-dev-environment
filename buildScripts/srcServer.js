import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console*/

const port = 4000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Bob", "lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2,"firstName":"Tammy", "lastName":"Norton","email":"norton@yahoo.com"},
    {"id": 3,"firstName":"Sammy","lastName":"Sansone","email":"sammy@hotmail.com"}
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
open('http://localhost:' + port);
  }
});
