// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');

// Load data
const data = require('./data.json');

// Set port
const port = process.env.PORT || 3000;

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set routes
app.get('/', (req, res) => {
    res.render('index', { data });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { name, comment } = req.body;
    const newComment = {
        name,
        comment
    };
    data.push(newComment);
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});