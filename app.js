const path = require('path');
const fs = require('fs');

const express = require('express');
const { json } = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilePath);
});

app.get('/restaurants', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath);
});

app.get('/recommended', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'views', 'recommended.html');
    res.sendFile(htmlFilePath);
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
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilePath);
});

app.get('/confirm', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlFilePath);
});

app.listen(port);

