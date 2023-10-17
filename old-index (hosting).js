let express = require('express')
let app = express()
var assetsDir = '/assets'
PAGES = [
  '/index',
  '/unbgames',
  '/wordle',
  '/changelog',
  '/blog',
  '/Discord-URL-Redirector',
];

FILES = [
  assetsDir + '/main.css',
  assetsDir + '/favicon.png',
  assetsDir + '/logo.png',
  '/404.html',
];

app.get('/', function(_, res) {
//  res.redirect('https://f169572e-163a-45d8-8da0-37b4ee4751e7.id.repl.co')
  res.sendFile(__dirname + '/index.html');
});

app.get('game_assets/wordle', function(_, res) {
  res.redirect('https://www.nytimes.com/games/wordle/images/NYT-Wordle-Icon-192.png')
//  res.sendFile(__dirname + '/index.html');
});

app.use('/assets',
  express.static(__dirname + 'assets'));

app.get('/__debug_wrapper.html', function(_, res) {
  //  res.redirect('/cs')
  res.sendFile(__dirname + '/index.html');
});

PAGES.forEach(page => {
  app.get(page, function(_, res) {
    res.sendFile(__dirname + page + '.html');
  });

  if (page == '/index') {
    console.log("'/index.html' routed to '/' and '" + page + "'")
  }

  else {
    console.log('\'' + page + '.html\' routed to \'' + page + '\'')
  }
});

FILES.forEach(file => {
  app.get(file, function(_, res) {
    res.sendFile(__dirname + file);
  });

  if (file == '/404.html') {
    console.log('\'/404.html\' routed to everything else')
  }

  else {
    console.log('\'' + file + '\' routed to \'' + file + '\'')
  }
});

app.get('/nyt*', function(req, res) {
  let page = req.originalUrl
  res.redirect('https://nytimes.com/' + page)
});

app.get('/site/thegamecompilation*', function(req, res) {
  let page = req.originalUrl
  res.redirect('https://dths--web-wizards.repl.co/user/_aHR0cHM6Ly9zaXRlcy5nb29nbGUuY29t_/' + page)
});

app.get('*', function(_, res) {
//    res.redirect('/404')
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(3000);