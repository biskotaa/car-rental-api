const express = require('express');
const { getDb } = require('../rent');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { year, color, steering_type, number_of_seats } = req.query;
        const carsCollection = getDb().collection('cars');

        let query = {};

        if(year) query.year = parseInt(year);
        if(color) query.color = color;
        if(steering_type) query.steering_type = steering_type;
        if(number_of_seats) query.number_of_seats = parseInt(number_of_seats);

        const cars = await carsCollection.find(query).sort({ price_per_day: 1 }).toArray();

        res.json(cars);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;