const path = require('path');

const express = require('express');

const { json } = require('express');

const port = 3000;

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);


app.use((req, res) => {
    res.status(404).render('404')
});

app.use((error, req, res, next) => {
    res.status(500).render('500');
});

app.listen(port);

