const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/users.db');

const app = express();

//configure the view engine
app.set('view-engine', 'ejs');

//configure public directory
app.use(express.static('public'));

//configure body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

//setup the default home route
app.get('/', (req, res) => {
    //Validate that username and password has values
    if (req.body.username && req.body.password) {
        //Check that username and password is in the database,
        //valid if both username+password are present
        db.get(`SELECT * FROM tblUsers WHERE username = ? AND password =?`,
            [req.body.username, req.body.password], (err, row) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else if (row) {
                    //username + password successful login, show the dashboard
                    res.redirect('/dashboard');
                } else {
                    //username or password not matching, show an error message to user
                    res.render('index', {
                        title: 'Login',
                        error: 'Invalid username or password, try again.'
                    });
                }
            });
    } else {
        //username or password not provided, show an error message to user
        res.render('index', {
            title: 'Login',
            error: 'Please provide both username and password.'
        });
    }
});

//Setup the dashboard route
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

//Start running the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});