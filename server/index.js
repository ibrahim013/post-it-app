import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackmiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import routes from '../server/routes/routes';

const app = express();

const port = parseInt(process.env.PORT, 10) || 3000;
const compiler = webpack(webpackConfig);

app.use(webpackmiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization');
  next();
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port);

module.exports = app.listen();
