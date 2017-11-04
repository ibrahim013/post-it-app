import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import socketio from 'socket.io';
import webpack from 'webpack';
import webpackmiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import routes from '../server/routes/routes';

const app = express();
const server = http.Server(app);
const io = new socketio(server);

app.io = io;
const port = parseInt(process.env.PORT, 10) || 3000;
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackmiddleware(compiler));
} else {
  app.use(express.static(path.join(__dirname, '../public')));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
} else {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
  });
});

server.listen(port);

module.exports = server.listen();
