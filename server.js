const express = require('express'),
hbs = require('hbs'),
app = express(),
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
   console.log(`Request method is: ${req.method} and request URL is: ${req.url}`);
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
