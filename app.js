var http    = require('http');
var express = require('express');
var twig    = require('twig');
var bodyP   = require('body-parser');
var cookieP = require('cookie-parser');
var session = require('express-session');
var app     = express();

// Configuration session
var sess_storage = session({
  secret: "projet web semantique",
  resave: false,
  saveUninitialized: false,
});

// Configuration application
app
  .use(bodyP.urlencoded({ extended: false }))
  .use(cookieP())
  .use(express.static('.'))
  .use(sess_storage)
  .set('views', 'templates')
  .set('twig options', { autoescape: true });

// Gestion accueil
app.get('/', function(req, res) {
  // Si l'utilisateur a indiqué vouloir sauter l'écran de bienvenue, redirection sur /map
  if (req.cookies.skipBienvenue == 'true')
    res.redirect('/map');
  // Sinon, redirection sur /bienvenue
  else
    res.redirect('/bienvenue');
});

// Gestion map
app.get('/map', function(req, res) {
  // Rendu de map.twig
  res.render('map.twig');
});

// Gestion bienvenue
app.get('/bienvenue', function(req, res) {
  // Rendu de bienvenue.twig
  res.render('bienvenue.twig', { 'skipBienvenue': req.cookies.skipBienvenue });
});

// Gestion reference
app.get('/reference', function(req, res) {
  // Rendu de reference.twig
  res.render('reference.twig');
});

// Gestion qui somes nous
app.get('/aboutus', function(req, res) {
  // Rendu de reference.twig
  res.render('aboutus.twig');
});

// Gestion 404
app.use(function(req, res, next){
  // Définition du code d'erreur
  res.status(404);
  // Rendu de 404.twig
  res.render('404.twig', { 'url': req.hostname+req.url });
});

// Lancement de l'application
app.listen(process.env.PORT || 8080);
