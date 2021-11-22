const path = require('path');

const express = require('express');
const app = express();
const port = 3000;

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

app.get('/about', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilePath);
});

// app.get('/confirm', (req, res) => {
//     const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
//     res.sendFile(htmlFilePath);
// });

app.listen(port);

