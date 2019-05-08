const express = require('express');
var cors = require('cors')
// const logger = require('morgan');
const app = express();
const port = 5000;
const len = 3; // hash length

let urls = [{url: 'www.google.com', slug: 'g', visits: 0}, {url: 'https://mundus-education.com', slug: 'm', visits: 1}];

// app.use(logger('dev'));
app.use(cors());

app.get('/add/:string', (req, res) => {
  const random = Math.random().toString().substring(2, len + 2).split('').map(i => String.fromCharCode(parseInt(i) + 65)).join('');
  const item = {url: req.params.string, slug: random, visits: 0};
  urls.push(item);
  res.send(urls);
});

app.get('/add/:string/:slug', (req, res) => {
  if(urls.find(item => item.slug === req.params.slug)){
    res.status(400).send({message: 'slug exists'});
    return;
  }
  const item = { url: req.params.string, slug: req.params.slug, visits: 0 };
  urls.push(item);
  res.send(urls);
});

app.get('/', (req, res) => {
  res.json(urls);
});

app.get('/:string', (req, res) => {
  const url = urls.find(obj => obj.slug == req.params.string);
  if(url){
    url.visits++;
    res.redirect(url.url);
  } else {
    res.status(404);
    res.send({message: 'not found'});
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
