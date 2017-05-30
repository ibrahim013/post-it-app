
// BASE SETUP==========================================
import express from 'express';
import bodyParser from 'body-parser';
import index from './routes/user';

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  next();
});


app.get('/', (req, res) => {
  res.send('welcome to the home page!');
});


// API LISTNER ============================================================
app.use('/api', index);
app.listen(port);

