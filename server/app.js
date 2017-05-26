
// BASE SETUP==========================================
import express from 'express';
import bodyParser from 'body-parser';
import index from './routes/user';

const app = express();

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
app.listen(8000);
console.log('Runing on port 8000');

