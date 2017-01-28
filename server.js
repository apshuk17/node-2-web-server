const express = require('express'),
hbs = require('hbs'),
app = express(),
fs = require('fs');
PORT = process.env.PORT || 3000;

//Setting View engine
app.set('view engine', 'hbs');

//Registering Partials
hbs.registerPartials(__dirname + '/views/partials');

//Registering getCurrentYear hbs helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
 //Register uppercase hbs helper
 hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
 });

 //use of middleware
 app.use((req, res, next) => {
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;
   fs.appendFile('server.log', log + `\n`);
   next();
 });

//Setting static folder
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome to Home Page.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Us Page',
    message: 'Welcome to About Us Page.'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page',
    message: 'Welcome to Portfolio Page.'
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
