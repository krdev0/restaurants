const path = require('path');
const fs = require('fs');

const jsonFilePath = path.join(__dirname, '..', 'data', 'restaurants.json');


function getStoredRestaurants() {
    const fileData = fs.readFileSync(jsonFilePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function storeRestaurants(restaurants) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(restaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
}