const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/users.db');

const app = express();

//configure the view engine
app.set('view engine', 'ejs');

//configure public directory
app.use(express.static('public'));

//configure body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

//setup the default home route
app.get('/', (req, res) => {
    try {
        //Validate that username and password has values
        if (req.body && req.body.username && req.body.password) {
            //Check that username and password is in the database,
            //valid if both username+password are present
            db.get(`SELECT * FROM tblUsers WHERE username = ? AND password =?`,
                [req.body.username, req.body.password], (err, row) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send({ message: 'Internal Server Error' });
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
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Setup the dashboard route
app.get('/dashboard', (req, res) => {
    try {
        res.render('dashboard', { title: 'Dashboard' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//Start running the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});