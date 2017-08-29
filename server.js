const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/**
 * Express Middleware
 */

// Log
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log!')
        }
    });
    next(); // Finish ASYNC function
});

// Maintenance Mode
// app.use((req, res, next) => {
//     res.render('mx.hbs');
// });

// Not In Maintenance
app.use(express.static(__dirname + '/public'));

//.Express Middleware

/**
 * HBS Helpers
 */

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//.HBS Helpers

/**
 * Express Routing
 */

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Tons of Sample Content'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to Fulfill Request'
    });
});

//.Express Routing

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});