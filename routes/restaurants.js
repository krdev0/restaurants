const express = require('express');

const uuid = require('uuid');

const restaurantData = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', (req, res) => {
    const storedRestaurants = restaurantData.getStoredRestaurants();
    let order = req.query.order;
    let nextOrder = 'desc';

    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }

    if (order === 'desc') {
        nextOrder = 'asc';
    }

    storedRestaurants.sort(function (resA, resB) {
        if ((order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name)) {
            return 1;
        }
        return -1;
    });

    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
        nextOrder: nextOrder
    });
});

router.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    const storedRestaurants = restaurantData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-details', {
                id: restaurantId,
                restaurant: restaurant
            });
        }
    }
    res.status(404).render('404');
});

router.get('/recommended', (req, res) => {
    res.render('recommended');
});

router.post('/recommended', (req, res) => {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const restaurants = restaurantData.getStoredRestaurants();
    restaurants.push(restaurant);

    restaurantData.storeRestaurants(restaurants);

    res.redirect('/confirm');
});

router.get('/confirm', (req, res) => {
    res.render('confirm');
});

module.exports = router;