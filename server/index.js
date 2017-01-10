// server/index.js

const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const winston = require('winston');
const PORT = 4200;

const runServer = () => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(require('compression')());
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-Access-Token, Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE');
    res.header('X-Content-Type-Options', 'nosniff');
    next();
  });

  app.use(express.static('../dist'));

  server.listen(PORT, () => {
    winston.log('info', 'Penny | ', PORT);
  });
};

// Running on multiple cores
if (cluster.isMaster) {
  const cpuCount = Math.ceil(require('os').cpus().length * 0.5) || 1;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died');
    cluster.fork();
  });
} else {
  runServer();
}
