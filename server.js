const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const { lastUpdated } = require('./server/database/database');
const app = express();
const port = 3000;

app.locals.lastUpdated = lastUpdated;

// Set templating engine
app.engine(
  'hbs',
  hbs.engine({
    layoutDir: path.join(__dirname, './views/layouts'),
    extname: 'hbs',
    defaultLayout: 'dashboard',
  })
);
app.set('view engine', 'hbs');

// Load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/dist/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/dist/js')));
app.use('/lib', express.static(path.resolve(__dirname, 'assets/dist/lib')));

// Load routers
app.use('/', require('./server/routes/router'));

// Start server
app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
