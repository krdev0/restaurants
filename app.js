const path = require('path');

const fs = require('fs');

const express = require('express');

const { json } = require('express');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/restaurants', (req, res) => {
    res.render('restaurants', {
        numberOfRestaurants: 2
    });
});

app.get('/recommended', (req, res) => {
    res.render('recommended');
});

app.post('/recommended', (req, res) => {
    const restaurantData = req.body;
    const jsonFilePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(jsonFilePath);

    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurantData);

    fs.writeFileSync(jsonFilePath, JSON.stringify(storedRestaurants));

    res.redirect('/confirm');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/confirm', (req, res) => {
   res.render('confirm');
});

app.listen(port);

