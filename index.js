const express = require('express')
const app = express()
const port = 3000

let urls = [{url: 'www.google.com', slug: 'g', visits: 0}, {url: 'https://mundus-education.com', slug: 'm', visits: 1}];

app.get('/add/:string', (req, res) => {
  res.send(`Creating ${req.params.string}`);
  const len = 3;
  const random = Math.random().toString().substring(2, len + 2).split('').map(i => String.fromCharCode(parseInt(i) + 65)).join('');
  urls.push({url: req.params.string, slug: random, visits: 0});
});

app.get('/add/:string/:slug', (req, res) => {
  res.send(`Creating ${req.params.string} | ${req.params.slug}`);
  urls.push({url: req.params.string, slug: req.params.slug, visits: 0});
});

app.get('/', (req, res) => {
  let out = 'Urls:<br><ul>';
  out += urls.map(item => `<li>${item.slug}(${item.visits}): ${item.url}</li>`).join('');
  out += '</ul>';
  console.log(out);
  res.send(out)
});

app.get('/:string', (req, res) => {
  const url = urls.find(obj => obj.slug == req.params.string);
  if(url){
    url.visits++;
    res.send(`Redirecting to<br/><a href="${url.url}">Url: ${url.url}</a></br>Slug: ${url.slug}<br/>${url.visits}`);
  } else {
    res.send('Not found');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
